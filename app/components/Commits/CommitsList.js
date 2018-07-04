import React from 'react';
import { connect } from 'react-redux';
import Commit from './Commit';
import SmoothCollapse from 'react-smooth-collapse';

class CommitsList extends React.Component {
  state = {
    expanded: false,
  };

  renderCommits() {
    let isMaster = false;
    const output = { output: [], master: [] };
    const { 
      masterCommits, 
      branchCommits,
      localCommits,
    } = this.props;

    const masterShas = masterCommits.map(commit => {
      return commit.sha;
    });
    for (let i = 0; i < branchCommits.length; i++) {
      if (!masterShas.includes(branchCommits[i].sha)) {
        output.output.push(branchCommits[i]);
      } else {
        output.master.push(branchCommits[i]);
      }
    }

    if (this.props.selectedBranch.name === 'master') {
      output.output = masterCommits;
      isMaster = true;
    }
    if (this.isClosedBranch()) {
      output.output = branchCommits;
    }
    
    return (
      <div className="commits-inner">
        {output.output.map(commit => {
          return (
            <Commit
              key={commit.sha}
              sha={commit.sha}
              name={commit.commit.author.name}
              message={commit.commit.message}
              date={commit.commit.committer.date}
              avatar={commit.author && commit.author.avatar_url}
              commit={commit}
            />
          );
        })}

        {isMaster || this.isClosedBranch()
          ? null
          : this.renderMasterCommits(output.master)}
      </div>
    );
  }

  isClosedBranch() {
    for (let i = 0; i < this.props.closedBranches.length; i++) {
      if (
        this.props.selectedBranch.head &&
        this.props.selectedBranch.head.ref ===
          this.props.closedBranches[i].head.ref
      ) {
        return true;
      }
    }
  }

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  renderLocalCommits = () => {
    return this.props.localCommits.map(commit => {
      commit.commit = {}
      commit.commit.author = {}
      commit.commit.tree= {}
      commit.commit.author.name = commit.authorName
      commit.commit.author.email = commit.committerEmail
      commit.commit.author.date = commit.committerDate
      commit.sha = commit.hash
      commit.commit.tree.sha = commit.treeHash
      commit.commit.message = commit.subject
      commit.parents = commit.parentHashes.split(' ')

      return (
        <Commit
          key={commit.sha}
          sha={commit.sha}
          name={commit.authorName}
          message={commit.subject}
          date={commit.committerDate}
          // avatar={commit.author && commit.author.avatar_url}
          commit={commit}
        />
      )
    })
  }

  renderMasterCommits = masterCommits => {
    return (
      <div>
        <div
          style={{
            color: 'black',
          }}
          onClick={this.toggle}
          className="patch-toggle"
        >
          Shared History with Master
        </div>
        <SmoothCollapse expanded={this.state.expanded}>
          {masterCommits.map(commit => {
            return (
              <Commit
                key={commit.sha}
                sha={commit.sha}
                name={commit.commit.author.name}
                message={commit.commit.message}
                date={commit.commit.committer.date}
                avatar={commit.author && commit.author.avatar_url}
                commit={commit}
              />
            );
          })}
        </SmoothCollapse>
      </div>
    );
  };

  render() {
    const {isLocalBranch} = this.props;

    return (
      <div className="commits">
        {isLocalBranch ? this.renderLocalCommits() : this.renderCommits()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  branchCommits: state.branchCommits,
  masterCommits: state.masterCommits,
  selectedBranch: state.selectedBranch,
  selectedRepo: state.selectedRepo,
  closedBranches: state.closedBranches,
  localCommits: state.localCommits,
  isLocalBranch: state.isLocalBranch,
});

export default connect(mapStateToProps)(CommitsList);

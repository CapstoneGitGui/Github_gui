import React from 'react';
import { connect } from 'react-redux';
import Commit from './Commit';

class CommitsList extends React.Component {
  renderCommits() {
    let isMaster = false;
    const output = { output: [], master: [] };
    const { masterCommits, branchCommits } = this.props;

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

    // return output.map(commit => {
    //   return (
    //     <Commit
    //       key={commit.sha}
    //       sha={commit.sha}
    //       name={commit.committer.login}
    //       message={commit.commit.message}
    //       date={commit.commit.committer.date}
    //       avatar={commit.author.avatar_url}
    //     />
    //     {isMaster || this.isClosedBranch() ? null : this.renderMasterCommits()}
    //   )
    // })

    return (
      <div className="commits-inner">
        {output.output.map(commit => {
          return (
            <Commit
              key={commit.sha}
              sha={commit.sha}
              name={commit.committer.login}
              message={commit.commit.message}
              date={commit.commit.committer.date}
              avatar={commit.author.avatar_url}
              commit={commit}
            />
          );
        })}

        {isMaster || this.isClosedBranch()
          ? null
          : renderMasterCommits(output.master)}
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

  render() {
    return <div className="commits">{this.renderCommits()}</div>;
  }
}

const mapStateToProps = state => ({
  branchCommits: state.branchCommits,
  masterCommits: state.masterCommits,
  selectedBranch: state.selectedBranch,
  selectedRepo: state.selectedRepo,
  closedBranches: state.closedBranches,
});


export default connect(mapStateToProps)(CommitsList);

const renderMasterCommits = (masterCommits) => {
  return (
    <div>
      <div
        style={{
          color: 'black',
        }}
      >
        Master
      </div>
      {masterCommits.map(commit => {
        return (
          <Commit
            key={commit.sha}
            sha={commit.sha}
            name={commit.committer.login}
            message={commit.commit.message}
            date={commit.commit.committer.date}
            avatar={commit.author.avatar_url}
            commit={commit}
          />
        );
      })}
    </div>
  );
}


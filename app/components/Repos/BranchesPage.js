import React from 'react';
import NavItem from '../Nav/Aside/NavItem';
import { connect } from 'react-redux';
import styles from '../Nav/Aside/Aside.css';

class BranchesPage extends React.Component {
  state = {
    selectedBranch: {},
  };
  renderCommits() {
    let isMaster = false;
    let output = [];
    const { masterCommits, branchCommits } = this.props;

    const masterShas = masterCommits.map(commit => {
      return commit.sha;
    });
    for (let i = 0; i < branchCommits.length; i++) {
      if (!masterShas.includes(branchCommits[i].sha)) {
        output.push(branchCommits[i]);
      }
    }
    if (this.props.selectedBranch.name === 'master') {
      output = masterCommits;
      isMaster = true;
    }
    if (this.isClosedBranch()) {
      output = branchCommits;
    }

    console.log('output', output[0] && output[0].commit.message);

    return (
      <div>
        {output.map(commit => {
          return (
            <NavItem
              key={commit.sha}
              path={`/repos/${this.props.selectedRepo}/commits/${commit.sha}`}
              name={commit.commit.message}
              isCommit={true}
              sha={commit.sha}
            />
          );
        })}
        {isMaster || this.isClosedBranch() ? null : this.renderMasterCommits()}
      </div>
    );
  }

  renderMasterCommits() {
    return (
      <div>
        <div
          className={styles.menu}
          style={{
            color: 'black',
          }}
        >
          Master
        </div>
        {this.props.masterCommits.map(commit => {
          return (
            <NavItem
              key={commit.sha}
              path={`/repos/${this.props.selectedRepo}/commits/${commit.sha}`}
              name={commit.commit.message}
              isCommit={true}
              sha={commit.sha}
            />
          );
        })}
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
    return (
      <div>
        <div>Branches</div>
        {this.props.branchCommits ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Commits</div>
            <div
              style={{
                overflow: 'scroll',
                height: '300px',
              }}
            >
              {this.renderCommits()}
            </div>
          </div>
        ) : null}
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
});

export default connect(
  mapStateToProps,
  null
)(BranchesPage);

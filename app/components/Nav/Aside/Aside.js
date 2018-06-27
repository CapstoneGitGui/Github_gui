import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchOpenBranches } from '../../../reducers/openBranches';
import { fetchClosedBranches } from '../../../reducers/closedBranches';

class Aside extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedRepo !== this.props.selectedRepo ||
      nextProps.currentUser !== this.props.currentUser
    ) {
      const { currentUser, selectedRepo } = this.props;
      let token = `${localStorage.getItem('token')}`;

      this.props.fetchOpenBranches(
        nextProps.currentUser,
        nextProps.selectedRepo,
        token
      );

      this.props.fetchClosedBranches(
        nextProps.currentUser,
        nextProps.selectedRepo,
        token
      );
    }
  }

  renderRepos() {
    const { repos } = this.props;

    return repos.map(repo => {
      return (
        <NavItem
          key={repo}
          path={`/repos/${repo}`}
          name={`${repo}`}
          isRepo={true}
        />
      );
    });
  }

  renderBranches() {
    return this.props.currentBranches.map(branch => {
      return (
        <NavItem
          key={branch.commit.sha}
          path="/home"
          name={branch.name}
          isBranch={true}
          branch={branch}
        />
      );
    });
  }

  renderClosedBranches() {
    return this.props.closedBranches.map(branch => {
      return (
        <NavItem
          key={branch.number}
          path="/home"
          name={branch.head.ref}
          isBranch={true}
          branch={branch}
        />
      );
    });
  }

  renderCommits(closedBranch) {
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

    return (
      <div>
        {output.map(commit => {
          return (
            <NavItem
              key={commit.sha}
              path="/home"
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
        <div className={styles.menu}>Master</div>
        {this.props.masterCommits.map(commit => {
          return (
            <NavItem
              key={commit.sha}
              path="/home"
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
    // this.props.closedBranches.forEach(branch => {
    // console.log(
    //   this.props.selectedBranch.head &&
    //     this.props.selectedBranch.head.ref === branch.head.ref
    // );
    // console.log(branch.head.ref);
    // console.log(
    //   this.props.selectedBranch.head && this.props.selectedBranch.head.ref
    // );
    // });

    return false;
  }

  render() {
    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path="/" name="Login Page (Temp)" />
          <NavItem path="/repos" name="Repositories" />
          <NavItem path="/home" name="Working Copy" />
          <NavItem path="/" name="History" />
          <NavItem path="/students" name="Stashes" />
          <NavItem path="/students" name="Settings" />
          <NavItem path="/commits" name="Add Repo" />
        </div>
        {this.props.currentBranches.length ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Open Branches</div>
            {this.renderBranches()}
          </div>
        ) : null}
        {this.props.closedBranches.length ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Closed Branches</div>
            {this.renderClosedBranches()}
          </div>
        ) : null}
        {this.props.branchCommits.length ? (
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
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repos,
  selectedRepo: state.selectedRepo,
  currentUser: state.auth.currentUser.username,
  currentBranches: state.openBranches,
  closedBranches: state.closedBranches,
  branchCommits: state.branchCommits,
  masterCommits: state.masterCommits,
  selectedBranch: state.selectedBranch,
});

export default connect(
  mapStateToProps,
  { fetchOpenBranches, fetchClosedBranches }
)(Aside);

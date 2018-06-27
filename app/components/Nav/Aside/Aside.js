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

  renderCommits() {
    return this.props.branchCommits.map(commit => {
      return (
        <NavItem
          key={commit.sha}
          path="/home"
          name={commit.commit.message}
          isCommit={true}
          sha={commit.sha}
        />
      );
    });
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
        ) : (
          <div />
        )}
        {this.props.closedBranches.length ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Closed Branches</div>
            {this.renderClosedBranches()}
          </div>
        ) : (
          <div />
        )}
        {this.props.branchCommits.length ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Commits</div>
            {this.renderCommits()}
          </div>
        ) : (
          <div />
        )}
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
});

export default connect(
  mapStateToProps,
  { fetchOpenBranches, fetchClosedBranches }
)(Aside);

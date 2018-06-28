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
    const { selectedRepo } = this.props;

    return this.props.currentBranches.map(branch => {
      return (
        <NavItem
          key={branch.commit.sha}
          path={`/repos/${selectedRepo}/branches/${branch.name}`}
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
          path={`/repos/${this.props.selectedRepo}/branches/${branch.name}`}
          name={branch.head.ref}
          isBranch={true}
          branch={branch}
        />
      );
    });
  }

  render() {
    const { selectedRepo } = this.props;

    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path="/" name="Login Page (Temp)" />
          <NavItem path="/repos" name="Repositories" />
          <NavItem
            path={`/repos/${selectedRepo}/working-copy`}
            name="Working Copy"
          />
          <NavItem path={`/repos/${selectedRepo}/history`} name="History" />
          <NavItem path={`/repos/${selectedRepo}/stashes`} name="Stashes" />
          <NavItem path={`/repos/${selectedRepo}/settings`} name="Settings" />
          <NavItem path={`/repos/new`} name="Add Repo" />
          <NavItem path="/barchart" name="BarChart" />
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

import React from 'react';
import NavItem from './NavItem';
import NavItemLocal from './NavItemLocal';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchOpenBranches } from '../../../reducers/openBranches';
import { fetchClosedBranches } from '../../../reducers/closedBranches';

class Aside extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedRepo !== this.props.selectedRepo ||
      nextProps.currentUser !== this.props.currentUser
    ) {
      const { currentUser, selectedRepo } = this.props;
      const token = `${localStorage.getItem('token')}`;

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

    return repos.map(repo => (
      <NavItem key={repo} path={`/repos/${repo}`} name={`${repo}`} isRepo />
    ));
  }

  renderBranches() {
    const { selectedRepo } = this.props;

    return this.props.currentBranches.map(branch => (
      <NavItem
        key={branch.commit.sha}
        path={`/repos/${selectedRepo}/branches/${branch.name}`}
        name={branch.name}
        isBranch
        branch={branch}
      />
    ));
  }

  renderClosedBranches() {
    const { selectedRepo } = this.props;

    return this.props.closedBranches.map(branch => (
      <NavItem
        key={branch.number}
        path={`/repos/${selectedRepo}/branches/${branch.name}`}
        name={branch.head.ref}
        isBranch
        branch={branch}
      />
    ));
  }

  renderLocalBranches() {
    const { selectedRepo, localBranches } = this.props;

    return localBranches.map((branch, index) => (
      <NavItem 
        key={index} 
        path={`/repos/${selectedRepo}/branches/${branch.name}`}
        name={branch} 
        isBranch
        isLocalBranch
        branch={branch}
      />
    ));
  }

  render() {
    const { selectedRepo } = this.props;

    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path="/" name="Login Page (Temp)" />
          <NavItem path="/localGit" name="Local" />
          <NavItem path="/repos" name="Repositories" />
          <NavItem
            path={`/repos/${selectedRepo}/working-copy`}
            name="Working Copy"
          />
          <NavItem path={`/repos/${selectedRepo}/history`} name="History" />
          <NavItem path={`/repos/${selectedRepo}/stashes`} name="Stashes" />
          <NavItem path={`/repos/${selectedRepo}/settings`} name="Settings" />
          <NavItem path="/repos/new" name="Add Repo" />
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
        {this.props.localBranches && this.props.isLocal ? (
          <div className={styles.menu_group}>
            <div className={styles.menu}>Local Branches</div>
            {this.renderLocalBranches()}
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
  localBranches: state.localBranches,
  isLocal: state.isLocal
});

export default connect(
  mapStateToProps,
  { fetchOpenBranches, fetchClosedBranches }
)(Aside);

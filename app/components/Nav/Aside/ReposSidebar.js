import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchOpenBranches } from '../../../reducers/openBranches';
import { fetchClosedBranches } from '../../../reducers/closedBranches';

class ReposSidebar extends React.Component {
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

  render() {
    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Repos</div>
          {this.renderRepos()}
        </div>
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
)(ReposSidebar);

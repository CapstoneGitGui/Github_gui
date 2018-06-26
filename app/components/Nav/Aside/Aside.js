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
      return <NavItem key={branch.commit.sha} path="/" name={branch.name} />;
    });
  }

  renderClosedBranches() {
    console.log(this.props.closedBranches)
    return this.props.closedBranches.map(branch => {
      return (
        <NavItem key={branch.number} path="/" name={branch.head.ref} />
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
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path="/" name="Login Page (Temp)" />
          <NavItem path="/home" name="Working Copy" />
          <NavItem path="/" name="History" />
          <NavItem path="/students" name="Stashes" />
          <NavItem path="/students" name="Settings" />
          <NavItem path="/commits" name="Commits" />
        </div>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Open Branches</div>
          {this.renderBranches()}
        </div>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Closed Branches</div>
          {this.renderClosedBranches()}
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
});

export default connect(
  mapStateToProps,
  { fetchOpenBranches, fetchClosedBranches }
)(Aside);

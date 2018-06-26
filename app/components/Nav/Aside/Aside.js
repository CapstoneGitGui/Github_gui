import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchOpenBranches } from '../../../reducers/openBranches';

class Aside extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRepo !== this.props.selectedRepo || nextProps.currentUser !== this.props.currentUser) {
      const { currentUser, selectedRepo } = this.props;
      let token = `?access_token=${localStorage.getItem('token')}`;
      
      this.props.fetchOpenBranches(nextProps.currentUser, nextProps.selectedRepo, token);
    }
  }

  renderRepos () {
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
    })
  }

  render() {
    // if (!this.props.selectedRepo) {
    //   return <div>Loading</div>;
    // }
    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Repos</div>
          { this.renderRepos() }
        </div>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path="/home" name="Working Copy" />
          <NavItem path="/" name="History" />
          <NavItem path="/students" name="Stashes" />
          <NavItem path="/students" name="Settings" />
          <NavItem path="/commits" name="Commits" />
        </div>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Branches</div>
          <NavItem path="/" name="master" />
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repos,
  selectedRepo: state.selectedRepo,
  currentUser: state.auth.currentUser.username,
});

export default connect(
  mapStateToProps,
  { fetchOpenBranches }
)(Aside);
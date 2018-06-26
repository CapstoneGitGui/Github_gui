import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchRepos } from '../../../reducers/repos';
import { fetchOpenBranches } from '../../../reducers/openBranches';

class Aside extends React.Component {
  componentDidMount() {
    this.props.fetchRepos();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { userName, selectedRepo } = this.props;
    console.log('selectedRepo', selectedRepo);
    let token = `?access_token=${localStorage.getItem('token')}`;
    this.props.fetchOpenBranches(userName, selectedRepo, token);
  }

  render() {
    if (!this.props.selectedRepo) {
      return <div>Loading</div>;
    }
    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Repos</div>
          {this.props.repos.map(repo => {
            return (
              <NavItem path={`/repos/${repo}`} name={`${repo}`} isRepo={true} />
            );
          })}
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
  userName: 'blakespencer',
});

export default connect(
  mapStateToProps,
  { fetchRepos, fetchOpenBranches }
)(Aside);

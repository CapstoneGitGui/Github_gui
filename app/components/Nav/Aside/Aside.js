import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';
import { connect } from 'react-redux';
import { fetchRepos } from '../../../reducers/repos';

class Aside extends React.Component {
  componentDidMount() {
    this.props.fetchRepos();
  }

  render() {
    return (
      <aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Repos</div>
          {this.props.repos.map(repo => {
            return <NavItem path={`${repo}`} name={`${repo}`} isRepo={true} />;
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
});

export default connect(
  mapStateToProps,
  { fetchRepos }
)(Aside);

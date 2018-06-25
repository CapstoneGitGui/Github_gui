import React from 'react';
import NavItem from './NavItem';
import styles from './Aside.css';

class Aside extends React.Component {
	render () {
		return (
			<aside className={styles.aside}>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Workspace</div>
          <NavItem path='/home'     name='Working Copy' />
          <NavItem path='/' name='History' />
          <NavItem path='/students' name='Stashes' />
          <NavItem path='/students' name='Settings' />
          <NavItem path='/repos' name='Repos' />
        </div>
        <div className={styles.menu_group}>
          <div className={styles.menu}>Branches</div>
          <NavItem path='/'         name='master' />
        </div>
			</aside>
		)
	}
}

export default Aside

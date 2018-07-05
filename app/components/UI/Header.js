import React from 'react';
import styles from './Header.css'

class Header extends React.Component {
  render () {
    return (
      <header className={`${styles.content_header} ${this.props.className}`}>
        {this.props.children}
      </header>
    )
  }
}

export default Header
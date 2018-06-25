// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';
import { logout } from '../reducers/user'

type Props = {};

class Home extends Component<Props> {
  props: Props;

  onLogout = () => {
    this.props.logout()
    localStorage.removeItem('token')
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Button color='blue' onClick={this.onLogout}>Logout</Button>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  logout,
})(Home)
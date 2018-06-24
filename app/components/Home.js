// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  createWindow () {
    ipcRenderer.send('oauth:form', 'hello world')
  }

  logout () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logged Out')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Button color='blue' onClick={this.createWindow}>Login with Github</Button>
          <Button color='blue' onClick={this.logout}>Logout</Button>
        </div>
      </div>
    );
  }
}

export default Home
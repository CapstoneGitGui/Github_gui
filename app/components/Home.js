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
  
  state = {
    data: [],
    dataHash: {}
  };

  onLogout = () => {
    this.props.logout()
    localStorage.removeItem('token')
  }

  type Props = {};

  

  renderCommits = async () => {
    const dataHash = {};
    const commits = await fetch(
      `https://api.github.com/repos/mmcdevi1/git_test/commits${token}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
        return data;
      })
      .catch(err => console.log(err));

    // commits.forEach(el => {
    //   dataHash[el.sha] = el;
    // });
    // this.setState({ dataHash });
    this.createHashTable(commits);
  };

  createHashTable = commits => {
    const dataHash = {};
    commits.forEach(el => {
      dataHash[el.sha] = el;
    });
    this.setState({ dataHash });
  };

  createChild = node => {
    node.parents.forEach(el => {
      return el;
    });
  };

  render() {
    const {data} = this.state;
    
    console.log('dataHash', this.state.dataHash);
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Button color='blue' onClick={this.onLogout}>Logout</Button>
          <h2>Home</h2>

          <button onClick={this.createWindow}>Login with Github</button>
          <button onClick={this.logout}>Logout</button>

          <ul>
            {
              data.map(commit => {
                return (
                  <li>{commit.sha}</li>
                );
              })
            }
          </ul>
          {}
          <button onClick={this.renderCommits}>Render Commits</button>

        </div>
      </div>
    );
  }
}

export default connect(null, {
  logout,
})(Home)
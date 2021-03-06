// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { push } from 'react-router-redux';

import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';
import { logout } from '../reducers/user';

import { configureStore } from '../store/configureStore';

const store = configureStore();

// type Props = {};

class Home extends Component<Props> {
  props: Props;
  // type Props = {};

  state = {
    data: [],
    dataHash: {},
    value: ''
  };

  onLogout = () => {
    this.props.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    store.dispatch(push('/'));
  };

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
    node.parents.forEach(el => el);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://gitgui-55ad0.firebaseio.com/repos.json', {
        name: this.state.value
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Button color="blue" onClick={this.onLogout}>
            Logout
          </Button>
          <ul>
            {data.map(commit => {
              return <li>{commit.sha}</li>;
            })}
          </ul>
          {}
          <button onClick={this.renderCommits}>Render Commits</button>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    logout
  }
)(Home);

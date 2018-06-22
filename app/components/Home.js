// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  state = {
    data: []
  };

  renderCommits = () => {
    fetch('https://api.github.com/repos/mmcdevi1/git_test/commits')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <button onClick={this.renderCommits}>Button</button>
        </div>
      </div>
    );
  }
}

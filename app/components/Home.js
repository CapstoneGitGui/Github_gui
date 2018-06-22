// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  state = {
    data: [],
    dataHash: {},
  };

  renderCommits = async () => {
    const dataHash = {};
    const commits = await fetch(
      'https://api.github.com/repos/mmcdevi1/git_test/commits'
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
    console.log('dataHash', this.state.dataHash);
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <ul>
            {this.state.data.map(commit => {
              return <li>{commit.sha}</li>;
            })}
          </ul>
          {}
          <button onClick={this.renderCommits}>Button</button>
        </div>
      </div>
    );
  }
}

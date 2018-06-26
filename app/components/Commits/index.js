// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Home.css';
import { connect } from 'react-redux';
// import ReactArt from 'react-art';

import axios from 'axios';

const token = localStorage.getItem('token');
const tokenCommits = `?access_token=${token}`;
const tokenBranches = `&access_token=${token}`;

class Commits extends Component<Props> {
  props: Props;

  state = {
    data: [],
    dataHash: {},
    repo: '',
    currentBranches: [],
    closedBranches: [],
  };

  renderCommits = async () => {
    const dataHash = {};
    const commits = await this.fetchCommits();
    const branches = await this.closedBranches();
    const branchesWithCommits = await this.closedBranchesCommits(
      branches,
      commits
    );
    commits.forEach(commit => {
      if (!commit.child) {
        commit.child = [];
      }
      if (!commit.branchName) {
        commit.branchName = 'master';
      }
      this.createChild(commit, commits);
    });
    this.isBranched(commits);
    this.isMerged(commits);
    console.log(this.findCommitsPerUser(commits));
    this.createHashTable(commits);
    // console.log(branchesWithCommits);
  };

  fetchCommits = async () => {
    const commits = await fetch(
      `https://api.github.com/repos/theFuriousPonies/furiousPonyDrinks/commits${tokenCommits}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
        return data;
      })
      .catch(err => console.log(err));
    return commits;
  };

  createHashTable = commits => {
    const dataHash = {};
    commits.forEach(el => {
      dataHash[el.sha] = el;
    });
    this.setState({ dataHash });
  };

  createChild = (node, nodes) => {
    node.parents.forEach(par => {
      const parent = nodes.filter(elem => {
        return elem.sha === par.sha;
      })[0];
      if (parent && !parent.child) {
        parent.child = [node];
      } else if (parent && !parent.child.includes(node)) {
        parent.child.push(node);
      }
    });
  };

  isBranched = nodes => {
    nodes.forEach(node => {
      if (node.child && node.child.length >= 2) {
        node.branched = true;
      } else {
        node.branched = false;
      }
    });
  };

  isMerged = nodes => {
    nodes.forEach(node => {
      if (node.parents.length === 2) {
        node.merged = true;
      } else {
        node.merged = false;
      }
    });
  };

  closedBranches = async () => {
    const branches = await fetch(
      `https://api.github.com/repos/${this.props.userName}/${
        this.state.repo
      }/pulls?state=closed${tokenBranches}`
    )
      .then(res => res.json())
      .then(closedBranches => {
        console.log('closedBrnahces', closedBranches);
        this.setState({ closedBranches });
        return closedBranches;
      })
      .catch(err => console.log(err));
    console.log(branches);
    return branches;
  };

  closedBranchesCommits = async (branches, commits) => {
    branches.forEach(async branch => {
      await fetch(`${branch.commits_url}${tokenCommits}`)
        .then(res => res.json())
        .then(data => {
          branch.commits = data;
          commits.forEach(commit => {
            branch.commits.forEach(branchCommit => {
              if (commit.sha === branchCommit.sha) {
                commit.branchName = branch.head.ref;
              }
            });
          });
          return data;
        })
        .catch(err => console.log(err));
    });
    return branches;
  };

  // Analytics for commits per user

  findUser = commits => {
    const users = {};
    commits.forEach(commit => {
      users[commit.commit.author.name] = 0;
    });
    return users;
  };

  findCommitsPerUser = commits => {
    const users = this.findUser(commits);
    for (let user in users) {
      commits.forEach(commit => {
        if (user === commit.commit.author.name) {
          users[user] += 1;
        }
      });
    }
    return users;
  };

  currentBranches = async commits => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.props.userName}/${
          this.state.repo
        }/branches`
      );

      const currentBranches = await response.json();

      this.setState({ closedBranches });
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const search = event.target.children[0].value;
    // console.log(`https://api.github.com/search/repositories?q=${search}`);

    const commits = await fetch(
      `https://api.github.com/repos/${
        this.props.userName
      }/${search}${tokenCommits}`
    )
      .then(res => res.json())
      .then(repo => {
        this.setState({ repo: repo.name });
        return repo;
      })
      .catch(err => console.log(err));

    axios
      .post('https://gitgui-55ad0.firebaseio.com/repos.json', {
        name: this.state.repo,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {this.state.data.map(commit => {
              return <li style={{ color: 'black' }}>{commit.sha}</li>;
            })}
            {this.state.currentBranches.map(branch => (
              <li style={{ color: 'black' }}>{branch.name}</li>
            ))}
            {this.state.closedBranches.map(branch => (
              <li style={{ color: 'black' }}>{branch.head.ref}</li>
            ))}
          </ul>
          <button onClick={this.renderCommits}>Button</button>
          <button onClick={this.currentBranches}>Current Branches</button>
          <button onClick={this.closedBranches}>Closed Branches</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.auth.currentUser.username,
});

export default connect(
  mapStateToProps,
  null
)(Commits);

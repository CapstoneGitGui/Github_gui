// @flow
import React, { Component } from 'react';
import { addRepo } from '../../reducers/repos';
import { connect } from 'react-redux';
import { Button } from 'react-desktop/macOs';
import electron from 'electron'
import fs from 'fs'
import { fetchLocalBranches } from '../../reducers/localBranches';
import { selectLocalRepo } from '../../reducers/localRepo';
import {setIsLocal} from '../../reducers/isLocal'

const {dialog} = electron.remote

class RepoList extends Component {
  state = {
    value: '',
    repos: [],
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.props.repos.includes(this.state.value)) {
      const token = localStorage.getItem('token');
      const tokenCommits = `?access_token=${token}`;

      const { username } = this.props;
      const { value } = this.state;
      const commits = await fetch(
        `https://api.github.com/repos/${username}/${value}${tokenCommits}`
      )
        .then(res => res.json())
        .then(repo => {
          this.setState({ repo: repo.name });
          return repo;
        })
        .catch(err => console.log(err));

      this.props.addRepo(value, username);
    }
  };

  fetchRepoNames = () => {
    const token = localStorage.getItem('token');
    const tokenCommits = `?access_token=${token}`;
    fetch(
      `https://api.github.com/users/${this.props.username}/repos${tokenCommits}`
    )
      .then(res => res.json())
      .then(repos => {
        this.setState({ repos });
        return repos;
      })
      .catch(err => console.log(err));
  };

  selectFolder = () => {
    const { fetchLocalBranches, selectLocalRepo } = this.props;

    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      async folderPath => {
        await fs.readdir(`${folderPath}/.git/refs/heads`, (err, files) => {
          const branches = [];
          files.forEach(file => {
            branches.push(file);
          });
          fetchLocalBranches(branches);
        });
        selectLocalRepo(folderPath[0]);
        this.props.setIsLocal(true)
      }
    );
  };

  render() {
    return (
      <div>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form>
        <form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
          {this.state.repos.length
            ? this.state.repos.map((repo, index) => {
                return (
                  <div key={index}>
                    <label key={repo.name} htmlFor={repo.name}>
                      {repo.name}
                    </label>
                    <input type="radio" value={repo.name} name="repo" />
                  </div>
                );
              })
            : this.fetchRepoNames()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  repos: state.repos,
});

export default connect(
  mapStateToProps,
  { 
    addRepo,
    selectLocalRepo,
    fetchLocalBranches,
    setIsLocal,
  }
)(RepoList);

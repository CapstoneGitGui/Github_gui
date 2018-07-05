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
import RemoteRepoButton from './RemoteRepoButton'

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

  toggle () {
    return 'active'
  }

  render() {
    return (
      <div className="padding-30 scroll">
        {/* <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form> */}
        <h1>Remote Repos</h1>
        <form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
          <div className="btn-group" data-toggle="buttons">
          {this.state.repos.length
            ? this.state.repos.map((repo, index) => {
                return (
                  <RemoteRepoButton key={index} name={repo.name} />
                );
              })
            : this.fetchRepoNames()}
          </div>
          <div className="form-footer">
            <Button color="blue" type="submit">Choose a Remote Repo</Button>
            <Button onClick={this.selectFolder} color="blue" type="submit">Choose a Local Repo</Button>
          </div>
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

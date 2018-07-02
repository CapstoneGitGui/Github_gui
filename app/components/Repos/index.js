// @flow
import React, { Component } from 'react';
import { addRepo } from '../../reducers/repos';
import { connect } from 'react-redux';

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

  render() {
    console.log(this.state.value);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <button type="submit">Submit</button>
        </form>
        <form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
          {this.state.repos.length
            ? this.state.repos.map(repo => {
                return (
                  <div>
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
  { addRepo }
)(RepoList);

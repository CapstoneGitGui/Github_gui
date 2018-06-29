import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';

import RenderedCode from './RenderedCode';

const githubToken = localStorage.getItem('token');

class Patches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tree: {},
      language: 'javascript',
      filesArray: [],
      sha: ''
    };
    this.getChangedFiles = this.getChangedFiles.bind(this);
  }

  componentDidMount () {
    this.getChangedFiles(this.props.match.params.sha)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.sha !== nextProps.match.params.sha) {
      this.getChangedFiles(nextProps.match.params.sha)

      this.setState({
        sha: nextProps.match.params.sha,
      });
    }
  }

  async getChangedFiles (sha) {
    let url = `https://api.github.com/repos/${this.props.userName}/${
      this.props.repo}/commits/${sha}`
    if (githubToken) url += `?access_token=${githubToken}`;
    const filesArray = await axios.get(url)
    this.setState({
      filesArray: filesArray.data.files
    })
  }

  render () {
    // const { language } = this.state;
    return (
      <div>
        {
          this.state.filesArray.map(file => {
              return (
                <div className='patches'>
                  <h4>{file.filename}</h4>
                  <Highlight className='diff'>
                      {file.patch}
                  </Highlight>
                </div>
              )
            }
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.auth.currentUser.username,
  repo: state.selectedRepo,
});

export default connect(
  mapStateToProps,
  null
)(Patches);

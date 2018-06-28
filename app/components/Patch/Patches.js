import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
    // this.getFileContents = this.getFileContents.bind(this);
    // this.handleFileSelect = this.handleFileSelect.bind(this);
    this.getChangedFiles = this.getChangedFiles.bind(this);
  }

  componentDidMount () {
    this.getChangedFiles(this.props.match.params.sha)
    .then(commitTree => this.parseTree(commitTree))
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
    const { language } = this.state;
    return (
      <div>
        {
          this.state.filesArray.map(file => {
              return (
                <div className=''>
                  <div>{file.filename}</div>
                  <RenderedCode
                    language={language}
                    contents={file.patch}
                  />
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

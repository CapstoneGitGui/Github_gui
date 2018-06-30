import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import SmoothCollapse from 'react-smooth-collapse'
import RenderedCode from './RenderedCode';
import Collapse from './SmoothCollapse';

const githubToken = localStorage.getItem('token');

class Patches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tree: {},
      language: 'javascript',
      filesArray: [],
      sha: '',
      expanded: false,
      additions: 0,
      deletions: 0,
    };
    this.getChangedFiles = this.getChangedFiles.bind(this);
  }

  componentDidMount () {
    this.getChangedFiles(this.props.sha)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.sha !== nextProps.sha) {
      this.getChangedFiles(nextProps.sha)

      this.setState({
        additions: nextProps.file
      })
    }
  }

  async getChangedFiles (sha) {
    let url = `https://api.github.com/repos/${this.props.userName}/${
      this.props.repo}/commits/${sha}`
    if (githubToken) url += `?access_token=${githubToken}`;
    const filesArray = await axios.get(url)
    this.setState({
      filesArray: filesArray.data.files,
      additions: filesArray.data.files.map(file => file.additions).reduce((a,b) => a + b),
      deletions: filesArray.data.files.map(file => file.deletions).reduce((a,b) => a + b),
    })
  }

  renderCollapse () {
    const { filesArray } = this.state;

    return filesArray.map((file, index) => {
      return (
        <Collapse 
          key={index}
          length={filesArray.length}
          filename={file.filename} 
          sha={file.sha} 
          patch={file.patch} 
        />
      )
    })
  }

  render () {
    const {filesArray, additions, deletions} = this.state;

    return (
      <div className="patches">
        <div className="patches-info muted">
          Showing {filesArray.length} changed files with {additions} additions and {deletions} deletions
        </div>
        { this.renderCollapse() }
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

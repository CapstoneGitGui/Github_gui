import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import RenderedContent from './RenderedContent';

const githubToken = localStorage.getItem('token');

class Patches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tree: {},
      language: 'javascript',
      searchResults: [],
      selectedFilePath: '',
      selectedFileContents: '',

    };
    this.getTree = this.getTree.bind(this);
    this.parseTree = this.parseTree.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.getLatestCommit = this.getLatestCommit.bind(this)
    this.getFileContents = this.getFileContents.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  componentDidMount () {
    this.getTree(this.props.match.params.sha)
    .then(commitTree => this.parseTree(commitTree))

    this.setState({
      sha: this.props.match.params.sha
    })
  }

  render () {
    return (

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
)(CommitTree);

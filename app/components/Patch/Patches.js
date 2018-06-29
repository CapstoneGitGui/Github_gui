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
      selectedFile: {
        expanded: false,
        sha: ''
      }
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
        sha: nextProps.sha,
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
    console.log(this.state)
    return (
      <div>
        {
          this.state.filesArray.map(file => {
              return (
                <div className='patches'>
                      <Collapse filename={file.filename} sha={file.sha} patch={file.patch} />
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

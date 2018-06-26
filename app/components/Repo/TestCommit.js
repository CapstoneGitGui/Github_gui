import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


// const githubToken = localStorage.getItem('token')
const githubToken = '2803223c9cfc707a2eaecf78798061581b34ee66'


class TestCommit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commits: []
    }
    // this.getTree = this.getTree.bind(this)
    // this.parseTree = this.parseTree.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.getLatestCommit = this.getLatestCommit.bind(this)
    // this.getFileContents = this.getFileContents.bind(this)
    // this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  async componentDidMount () {
    let url = `https://api.github.com/repos/demo716/HoopUp/commits`
    // if (githubToken) url += `&access_token=${githubToken}`
    const commitArr = await axios.get(url)

    console.log(commitArr.data)

    this.setState({
      commits: commitArr.data
    })
  }

  clickHandler(sha) {
    this.props.history.push(`/testcommits/${this.state.courtInfo.id}`);
  }

  render () {
    console.log(this.state)
    return (
     <div>
      {
        this.state.commits.map((commit) => {
          return (
          <li key={commit.node_id} onClick={commit.sha}>{commit.commit.message}</li>
          )
        })
      }
     </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.auth.currentUser.username,
});

export default withRouter(connect(
  mapStateToProps,
  null
)(TestCommit))

import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import Header from '../UI/Header';
// import {setSelectedCommit} from '../../reducers/selectedCommit'
import SmoothCollapse from 'react-smooth-collapse'
import Patches from '../Patch/Patches';

class SelectedCommit extends React.Component {

  state = {
    expanded: false
  }

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    const { commit } = this.props;
    console.log(commit)
    return (
      <div className="commit-single-content">
        <div className="commit-info-header">
          <Header>
            <div className="code muted">{commit.sha.substr(0,8)}</div>
          </Header>
        </div>
        <div className="commit-meta-data">
          <div>{`Author: ${commit.commit.author.name} <${commit.commit.author.email}>`}</div>
          <div>Author Date: <Moment format="MMM D, YYYY HH:mm">{commit.commit.author.date}</Moment></div>
          <div>Committer: {commit.commit.author.name}</div>
          <div>Committer Date: {commit.commit.author.name}</div>
          <div>Refs: {commit.commit.author.name}</div>
          <div>Commit Hash: {commit.sha}</div>
          {
            commit.parents.map(parent => {
              return (
                <div key={parent.sha}>
                  Parent Hash: {parent.sha}
                </div>
              )
            })
          }
          <div>Tree Hash: {commit.commit.tree.sha}</div>
        </div>
        <div className="commit-info">
          {commit.commit.message}
          <Patches sha={commit.sha} />
        </div>
      </div>
    )
  }
}

export default connect(null)(SelectedCommit)

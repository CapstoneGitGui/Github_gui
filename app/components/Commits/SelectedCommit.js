import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import Header from '../UI/Header';
// import {setSelectedCommit} from '../../reducers/selectedCommit'

class SelectedCommit extends React.Component {
  // handleClick = (commit) => {
  //   this.props.setSelectedCommit(commit)
  // }

  render () {
    const { commit } = this.props;
    console.log(commit)
    return (
      <div className="commit-single-content">
        <div className="commit-header">
          <Header>
            {commit.sha.substr(0,8)}
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
        </div>
      </div>
    )
  }
}

export default connect(null)(SelectedCommit)
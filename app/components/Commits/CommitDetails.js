import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import Header from '../UI/Header';
// import {setSelectedCommit} from '../../reducers/selectedCommit'
import Patches from '../Patch/Patches';

export default class CommitDetails extends React.Component {

  render () {
    const { commit } = this.props;
    return (
      <div>
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
          <div className="commit-info-message">
            {commit.commit.message}
          </div>
          <Patches sha={commit.sha} />
        </div>
      </div>
    )
  }

}

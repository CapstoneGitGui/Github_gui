import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {setSelectedCommit} from '../../reducers/selectedCommit'

class Commit extends React.Component {
  handleClick = (commit) => {
    console.log(this.props.local)
    if(!this.props.local){
    this.props.setSelectedCommit(commit)
    }
  }

  render () {
    const {
      name,
      message,
      sha,
      date,
      avatar,
      commit,
    } = this.props;

    return (
      <div className="commit" onClick={() => this.handleClick(commit)}>
        <img src={avatar} height="29" style={{float: 'left', marginRight: '8px'}} />
        <div className="commit-header">
          <div className="commit-header-committer">
            {name}
          </div>
          <div className="commit-header-date">
            <Moment format="MM/DD/YYYY">
              {date}
            </Moment>
          </div>
        </div>
        <div className="commit-content">
          <span className="commit-id code">{sha.substr(0,8)}</span> {message}
        </div>
      </div>
    )
  }
}

export default connect(null, {
  setSelectedCommit,
})(Commit)

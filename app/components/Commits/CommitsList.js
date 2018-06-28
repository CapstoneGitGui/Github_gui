import React from 'react'
import Commit from './Commit'

class CommitsList extends React.Component {
  render () {
    return (
      <div className="commits">
        <Commit />
      </div>
    )
  }
}

export default CommitsList
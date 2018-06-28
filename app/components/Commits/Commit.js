import React from 'react'

class Commit extends React.Component {
  render () {
    return (
      <div className="commit">
        <div className="commit-header">
          <div className="commit-header-committer">
            mmcdevi1
          </div>
          <div className="commit-header-date">
            6/13/18
          </div>
        </div>
        <div className="commit-content">
          <span className="commit-id">235gdsf</span> Commit message
        </div>
      </div>
    )
  }
}

export default Commit
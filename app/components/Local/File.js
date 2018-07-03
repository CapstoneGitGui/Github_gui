import React from 'react'

class File extends React.Component {
  handleClick = (commit) => {
    this.props.setSelectedCommit(commit)
  }

  render () {
    const {
      name
    } = this.props;

    return (
      <div className="file" onClick={() => this.handleClick(commit)}>
        <div className="file-header">
          <div className="file-header-committer">
            {name}
          </div>
        </div>
      </div>
    )
  }
}

export default File
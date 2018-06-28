import React from 'react'
import Moment from 'react-moment'

class Commit extends React.Component {
  render () {
    const {
      name,
      message,
      sha,
      date,
      avatar,
    } = this.props;

    return (
      <div className="commit">
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
          <span className="commit-id">{sha.substr(0,8)}</span> {message}
        </div>
      </div>
    )
  }
}

export default Commit
import React from 'react'
import { connect } from 'react-redux'

class Breadcrumb extends React.Component {
  render () {
    return (
      <header>
        {this.props.location.pathname}
      </header>
    )
  }
}

function mapStateToProps (state) {
  const { location } = state.router

  return {
    location,
  }
}

export default connect(mapStateToProps)(Breadcrumb)
import React from 'react'
import { connect } from 'react-redux'
import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem } from 'react-desktop/macOs'

class Breadcrumb extends React.Component {
  render () {
    return (
      <TitleBar>
        {this.props.location.pathname}
      </TitleBar>
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
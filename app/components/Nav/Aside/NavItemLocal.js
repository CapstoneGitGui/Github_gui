import React from 'react'
import { NavLink } from 'react-router-dom';

class NavItemLocal extends React.Component {
  handleClick = () => {
    
  }

  render () {
    return (
      <NavLink to={this.props.path} onClick={this.handleClick}>
        {this.props.name}
      </NavLink>
    )
  }
}

export default NavItemLocal
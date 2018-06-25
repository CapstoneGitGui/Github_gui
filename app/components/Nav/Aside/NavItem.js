import React from 'react';
import { NavLink } from 'react-router-dom';

class NavItem extends React.Component {
	render () {
		return (
      <NavLink to={this.props.path}>
        { this.props.name }
      </NavLink>
		)
	}
}

export default NavItem
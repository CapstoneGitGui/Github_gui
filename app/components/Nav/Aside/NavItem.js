import React from 'react';
import { NavLink } from 'react-router-dom';

class NavItem extends React.Component {
	render () {
		return (
			<div>
				<NavLink to={this.props.path}>
					{ this.props.name }
				</NavLink>
			</div>
		)
	}
}

export default NavItem
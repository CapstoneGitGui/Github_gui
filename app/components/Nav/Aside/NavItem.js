import React from 'react';
import { NavLink } from 'react-router-dom';
import { setSelectedRepo } from '../../../reducers/selectedRepo';
import { connect } from 'react-redux';

class NavItem extends React.Component {
  handleClick = () => {
    this.props.isRepo && this.props.setSelectedRepo(this.props.name);
  };

  render() {
    return (
      <NavLink to={this.props.path} onClick={this.handleClick}>
        {this.props.name}
      </NavLink>
    );
  }
}

export default connect(
  null,
  { setSelectedRepo }
)(NavItem);

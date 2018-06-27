import React from 'react';
import { NavLink } from 'react-router-dom';
import { setSelectedRepo } from '../../../reducers/selectedRepo';
import { setSelectedBranch } from '../../../reducers/selectedBranch';
import { fetchBranchCommits } from '../../../reducers/branchCommits';
import { connect } from 'react-redux';

class NavItem extends React.Component {
  handleClick = () => {
    if (this.props.isRepo) {
      // this.props.setSelectedRepo(this.props.name);
    } else if (this.props.isBranch) {
      const token = localStorage.getItem('token');
      this.props.setSelectedBranch(this.props.branch);
      this.props.fetchBranchCommits(
        token,
        this.props.branch,
        this.props.currentUser,
        this.props.selectedRepo
      );
    }
  };

  render() {
    return (
      <NavLink to={this.props.path} onClick={this.handleClick}>
        {this.props.name}
      </NavLink>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser.username,
  selectedRepo: state.selectedRepo,
});

export default connect(
  mapStateToProps,
  { setSelectedRepo, setSelectedBranch, fetchBranchCommits }
)(NavItem);

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
      );
    }
  };

  render() {
    if(this.props.isCommit) {
      return (
        <NavLink to={`/commit/${this.props.sha}`} >
          {this.props.name}
        </NavLink>
      )
    }
    return (
      <NavLink to={this.props.path} onClick={this.handleClick}>
        {this.props.name}
      </NavLink>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser.username,
});

export default connect(
  mapStateToProps,
  { setSelectedRepo, setSelectedBranch, fetchBranchCommits }
)(NavItem);
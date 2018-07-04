import React from 'react';
import { NavLink } from 'react-router-dom';
import { setSelectedRepo } from '../../../reducers/selectedRepo';
import { setSelectedBranch } from '../../../reducers/selectedBranch';
import { fetchBranchCommits } from '../../../reducers/branchCommits';
import { connect } from 'react-redux';
import { fetchMasterCommits } from '../../../reducers/masterCommits';
import { setIsLocal } from '../../../reducers/isLocal';
import { fetchOpenBranches } from '../../../reducers/openBranches';
import { fetchCommitActivity } from '../../../reducers/commitActivity';

class NavItem extends React.Component {
  handleClick = () => {
    if (this.props.isLocalRepo) {
      this.props.setIsLocal(true);
      this.props.fetchOpenBranches(
        this.props.currentUser,
        this.props.name,
        localStorage.getItem('token')
      );
    } else if (this.props.isRepo) {
      const token = localStorage.getItem('token');
      // this.props.setSelectedRepo(this.props.name);
      this.props.setIsLocal(false);
      this.props.fetchCommitActivity(
        this.props.currentUser,
        this.props.selectedRepo,
        token
      );
    } else if (this.props.isBranch) {
      const token = localStorage.getItem('token');
      this.props.setSelectedBranch(this.props.branch);
      this.props.fetchBranchCommits(
        token,
        this.props.branch,
        this.props.currentUser,
        this.props.selectedRepo
      );
      if (!this.props.masterCommits.length && this.props.openBranches.length) {
        const master = this.props.openBranches.filter(branch => {
          return branch.name === 'master';
        })[0];
        this.props.fetchMasterCommits(
          token,
          this.props.currentUser,
          master,
          this.props.selectedRepo
        );
      }
    }
  };

  render() {
    if (this.props.isCommit) {
      return (
        <NavLink to={`/commit/${this.props.sha}`}>{this.props.name}</NavLink>
      );
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
  selectedRepo: state.selectedRepo,
  openBranches: state.openBranches,
  masterCommits: state.masterCommits,
  fetchCommitActivity: state.fetchCommitActivity,
});

export default connect(
  mapStateToProps,
  {
    setSelectedRepo,
    setSelectedBranch,
    fetchBranchCommits,
    fetchMasterCommits,
    setIsLocal,
    fetchOpenBranches,
    fetchCommitActivity,
  }
)(NavItem);

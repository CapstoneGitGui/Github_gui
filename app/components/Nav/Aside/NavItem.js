import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSelectedRepo } from '../../../reducers/selectedRepo';
import { setSelectedBranch } from '../../../reducers/selectedBranch';
import { fetchBranchCommits } from '../../../reducers/branchCommits';
import { fetchMasterCommits } from '../../../reducers/masterCommits';
import { setIsLocal } from '../../../reducers/isLocal';
import { fetchOpenBranches } from '../../../reducers/openBranches';
import { fetchLocalCommits } from '../../../reducers/localCommits'

const token = localStorage.getItem('token')

class NavItem extends React.Component {
  handleClick = () => {
    const { 
      isLocalRepo,
      currentUser,
      name,
      isRepo,
      isBranch,
    } = this.props;

    if (isLocalRepo) {
      this.props.setIsLocal(true)
      this.props.fetchOpenBranches(currentUser, name, token )
    }

    if (isRepo) {
      // this.props.setSelectedRepo(this.props.name);
      this.props.setIsLocal(false)

    } else if (isBranch) {
      this.props.fetchLocalCommits(this.props.branch, this.props.localRepo)
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
  localRepo: state.localRepo,
  // isLocalRepo: state.isLocal,
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
    fetchLocalCommits,
  }
)(NavItem);

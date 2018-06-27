// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleRepo from '../components/Repos/SingleRepo';
import { setSelectedRepo, resetSelectedRepo } from '../reducers/selectedRepo';

class SingleRepoPage extends Component {
  componentDidMount() {
    const {
      setSelectedRepo,
      match: { params },
    } = this.props;
    const token = localStorage.getItem('token');
    setSelectedRepo(params.id);
  }

  componentWillUnmount() {
    // this.props.resetSelectedRepo()
  }

  render() {
    const { openBranches, match: {params} } = this.props
    return (
      <SingleRepo 
        match={this.props.match}
        name={params.id} 
        openBranches={openBranches}
      />
    );
  }
}

function mapStateToProps (state) {
  return {
    openBranches: state.openBranches
  }
}

export default connect(mapStateToProps, { 
  setSelectedRepo, 
  resetSelectedRepo 
})(SingleRepoPage)

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
    setSelectedRepo(params.id);
  }

  componentWillUnmount() {
    // this.props.resetSelectedRepo()
  }

  render() {
    const { params } = this.props.match;
    return <SingleRepo name={params.id} />;
  }
}

export default connect(
  null,
  {
    setSelectedRepo,
    resetSelectedRepo,
  }
)(SingleRepoPage);

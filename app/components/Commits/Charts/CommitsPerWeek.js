import React, { Component } from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { connect } from 'react-redux';

class CommitsPerWeek extends Component {
  state = {
    data: {},
  };

  formatData = (data, name) => {};

  render() {
    console.log(this.props.state);
    return <div />;
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(
  mapStateToProps,
  null
)(CommitsPerWeek);

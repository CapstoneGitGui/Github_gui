import React, { Component } from 'react';
import Highlight from 'react-highlight';
import SmoothCollapse from 'react-smooth-collapse'

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderSmoothCollapse () {
    return (
      <SmoothCollapse expanded={this.state.expanded} >
        <Highlight className='diff'>
          {this.props.patch}
        </Highlight>
      </SmoothCollapse>
    )
  }

  render () {
    const { sha, length } = this.props;

    return (
      <div className="patch" id={sha}>
        <div className="patch-toggle" onClick={this.toggle}>
          <span className="blue">modified</span> <span className="muted">{this.props.filename}</span>
        </div>
        { this.renderSmoothCollapse() }
      </div>
    )
  }
}

export default Collapse

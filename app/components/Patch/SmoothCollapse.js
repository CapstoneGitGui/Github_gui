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

  render () {
    return (
      <div>
      <h4 onClick={this.toggle} id={this.props.sha}>{this.props.filename}</h4>
      <SmoothCollapse className={this.props.sha} expanded={this.state.expanded} >
        <Highlight className='diff'>
          {this.props.patch}
        </Highlight>
      </SmoothCollapse>
      </div>
    )
  }
}

export default Collapse

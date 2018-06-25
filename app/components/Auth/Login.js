// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-desktop/macOs';

class Login extends Component {
  render() {
    return (
      <div>
        <Button color='blue' onClick={this.createWindow}>Login with Github</Button>
        <Button color='blue' onClick={this.logout}>Logout</Button>
      </div>
    )
  }
}

export default Login

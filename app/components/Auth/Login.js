// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

class Login extends Component {
  createWindow () {
    ipcRenderer.send('oauth:form', 'hello world')
  }

  logout () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logged Out')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Button color='blue' onClick={this.createWindow}>Login with Github</Button>
        <Button color='blue' onClick={this.logout}>Logout</Button>
      </div>
    )
  } 
}

function mapStateToProps (state) {
  const { authenticated } = state.auth

  return {
    authenticated,
  }
}

export default connect(mapStateToProps)(Login)
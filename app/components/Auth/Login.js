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
      <div className="flex full-height">
        <div className="login-page align-self-center">
          <div onClick={this.createWindow} className="btn btn-block btn-social btn-github">
            <span className="fa fa-github"></span> Sign in with Github
          </div>
        </div>
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
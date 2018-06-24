// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { fetchUserFromToken, fetchUser } from '../reducers/user'
import { ipcRenderer } from 'electron'

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.fetchUserFromToken(token)
    }

    ipcRenderer.on('token:send', (e, token) => {
      this.props.fetchUser(token)
    })
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(null, {
  fetchUserFromToken,
  fetchUser,
})(App)
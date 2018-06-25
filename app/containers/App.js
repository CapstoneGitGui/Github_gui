// @flow
import * as React from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { fetchUserFromToken, fetchUser } from '../reducers/user'
import { ipcRenderer } from 'electron'
import Aside from '../components/Nav/Aside'

type Props = {
  children: React.Node
};

const token = localStorage.getItem('token')

class App extends React.Component<Props> {
  props: Props;

  componentDidMount () {
    if (token) {
      this.props.fetchUserFromToken(token)
    }

    // Fetch user from Github login
    ipcRenderer.on('token:send', (e, token) => {
      this.props.fetchUser(token)
    })
  }

  renderAside () {
    const { location } = this.props;

    if (location.pathname !== '/') {
      return <Aside />
    }
  }

  render() {
    if (token && this.props.location.pathname === '/') {
      return <Redirect to='/home' />
    } 
    return (
      <div className="app">
        { this.renderAside() }
        <div className="content">
          <main className="main-content">
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { location } = state.router;

  return {
    location,
  }
}

export default connect(mapStateToProps, {
  fetchUserFromToken,
  fetchUser,
})(App)
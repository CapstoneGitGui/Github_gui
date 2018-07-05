// @flow
import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchUserFromToken, fetchUser, requestUser } from '../reducers/user';
import { ipcRenderer } from 'electron';
import Aside from '../components/Nav/Aside';
import ReposSidebar from '../components/Nav/Aside/ReposSidebar';
import { fetchRepos } from '../reducers/repos';
import Breadcrumb from '../components/Nav/Breadcrumb/Breadcrumb';
import { configureStore } from '../store/configureStore';
import { push } from 'react-router-redux'
import HeaderBar from '../components/UI/HeaderBar'

const store = configureStore();

type Props = {
  children: React.Node,
};

const token = localStorage.getItem('token');

class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;

    if (token) {
      this.props.fetchUserFromToken(token);
    }

    // Fetch user from Github login
    ipcRenderer.on('token:send', (e, token) => {
      this.props.fetchUser(token);
      store.dispatch(push('/repos'))
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.fetchRepos(nextProps.currentUser);
    }
  }

  renderAside() {
    const { location } = this.props;

    switch (location.pathname) {
      case '/repos':
        return <ReposSidebar />
      case '/':
        return null
      default:
        return <Aside />
    }
  }

  render() {
    // if (token && this.props.location.pathname === '/') {
    //   return <Redirect to="/home" />;
    // }
    return (
      <div>
        <HeaderBar />
        <Breadcrumb />
        <div className="app">
          {this.renderAside()}
          <div className="content">
            <main className="main-content">{this.props.children}</main>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { location } = state.router;
  const { isLoading, currentUser } = state.auth;

  return {
    location,
    userLoading: isLoading,
    currentUser: currentUser.username,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchUserFromToken,
    fetchUser,
    fetchRepos,
    requestUser,
  }
)(App);

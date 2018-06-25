/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RepoPage from './containers/RepoPage';

export default () => (
  <App>
    <Switch>
      <Route path="/repos" component={RepoPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);

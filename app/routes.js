/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import CommitsPage from './containers/CommitsPage';
import CommitTreePage from './containers/CommitTreePage'

export default () => (
  <App>
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/commits" component={CommitsPage} />
      <Route path="/commit/:sha" component={CommitTreePage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);

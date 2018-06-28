/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import CommitTreePage from './containers/CommitTreePage';
import RepoRoutes from './containers/RepoRoutes';
import BarChart from './components/Commits/BarChart';

export default () => (
  <App>
    <Switch>
      <Route path="/barChart" component={BarChart} />
      <Route path="/repos" component={RepoRoutes} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);

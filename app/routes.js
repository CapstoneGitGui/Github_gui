/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import CommitTreePage from './containers/CommitTreePage';
import RepoRoutes from './containers/RepoRoutes';
<<<<<<< HEAD
import LocalGitPage from './containers/LocalGit';
=======
import BarChart from './components/Commits/BarChart';
>>>>>>> 3d5f345c39c01686eeabf7542133bda833b9eda4

export default () => (
  <App>
    <Switch>
      <Route path="/barChart" component={BarChart} />
      <Route path="/localGit" component={LocalGitPage} />
      <Route path="/repos" component={RepoRoutes} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);

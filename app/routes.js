/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import CommitTreePage from './containers/CommitTreePage';
import RepoRoutes from './containers/RepoRoutes';
import LocalGitPage from './containers/LocalGit';
import LocalBranch from './containers/LocalBranchPage';
import PatchPage from './containers/PatchPage';
import Charts from './components/Commits/Charts';

export default () => (
  <App>
    <Switch>
      <Route path="/localGit" component={LocalGitPage} />
      <Route path="/localBranch" component={LocalBranch} />
      <Route path="/barChart" component={Charts} />
      <Route path="/repos" component={RepoRoutes} />
      <Route path="/home" component={HomePage} />
      {/* <Route path="/commit/:sha" component={CommitTreePage} /> */}
      <Route path="/commit/:sha" component={PatchPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);

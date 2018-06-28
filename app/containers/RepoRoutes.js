import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReposPage from './ReposPage';
import SingleRepo from './SingleRepo';
import Commits from '../components/Commits';
import CommitsPage from './CommitsPage';
import CommitTreePage from './CommitTreePage';

class RepoRoutes extends React.Component {
  render() {
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}`} exact component={ReposPage} />
        <Route path={`${path}/commits`} component={CommitsPage} />
        <Route path={`${path}/commits/:sha`} component={CommitTreePage} />
        <Route path={`${path}/new`} exact component={Commits} />
        <Route path={`${path}/:id`} component={SingleRepo} />
      </Switch>
    );
  }
}

export default RepoRoutes;

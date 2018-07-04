import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReposPage from './ReposPage';
import SingleRepoPage from './SingleRepoPage';
import Commits from '../components/Commits';
import CommitsPage from './CommitsPage';
import CommitTreePage from './CommitTreePage';

class RepoRoutes extends React.Component {
  render() {
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}`} exact component={ReposPage} />
        <Route path={`${path}/new`} exact component={Commits} />
        <Route path={`${path}/:id`} component={SingleRepoPage} />
      </Switch>
    );
  }
}

export default RepoRoutes;
// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import HistoryPage from './HistoryPage';
import StashesPage from './StashesPage';
import SettingsPage from './SettingsPage';
import BranchesPage from './BranchesPage';
// import Commits from '../components/Commits';
import CommitsPage from '../../containers/CommitsPage';
import CommitTreePage from '../../containers/CommitTreePage';
import WorkingCopy from './WorkingCopy';

const token = localStorage.getItem('token');

class SingleRepo extends Component {
  render() {
    const {
      name,
      match: { url }
    } = this.props;

    return (
      <Switch>
        <Route path={`${url}/working-copy`} component={WorkingCopy} />
        <Route path={`${url}/history`} component={HistoryPage} />
        <Route path={`${url}/stashes`} component={StashesPage} />
        <Route path={`${url}/settings`} component={SettingsPage} />
        <Route path={`${url}/branches/:id`} component={BranchesPage} />
        <Route path={`${url}/commits`} component={CommitsPage} />
        <Route path={`${url}/commits/:sha`} component={CommitTreePage} />
      </Switch>
    );
  }
}

export default SingleRepo;

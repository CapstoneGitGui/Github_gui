// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import HistoryPage from './HistoryPage'
import StashesPage from './StashesPage'
import SettingsPage from './SettingsPage'
import BranchesPage from './BranchesPage'

const token = localStorage.getItem('token')

class SingleRepo extends Component {
  render() {
    const { 
      name,
      match: { url } 
    } = this.props

    return (
      <Switch>
        <Route path={`${url}/history`} component={HistoryPage} />
        <Route path={`${url}/stashes`} component={StashesPage} />
        <Route path={`${url}/settings`} component={SettingsPage} />
        <Route path={`${url}/branches/:id`} component={BranchesPage} />
      </Switch>
    )
  }
}

export default SingleRepo
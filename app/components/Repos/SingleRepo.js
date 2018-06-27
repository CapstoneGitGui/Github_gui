// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'
import HistoryPage from './HistoryPage'
import StashesPage from './StashesPage'
import SettingsPage from './SettingsPage'

const token = localStorage.getItem('token')

class SingleRepo extends Component {
  state = {
    branches: [],
    commits: {},
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.openBranches.length !== this.props.openBranches.length) {
      this.setState({branches: nextProps.openBranches.map(branch => {
        this.renderCommits(branch.commit.sha)
        return branch.commit.sha
      })})
    }
  }

  renderCommits (sha) {
    axios
      .get(`https://api.github.com/repos/mmcdevi1/myflix/commits?per_page=100&sha=${sha}&access_token=${token}`)
      .then(res => {
        this.setState({
          commits: {
            ...this.state.commits,
            [sha]: res.data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { 
      name,
      match: { url } 
    } = this.props
    return (
      <div>
        {name}
        <Switch>
          <Route path={`${url}/history`} component={HistoryPage} />
          <Route path={`${url}/stashes`} component={StashesPage} />
          <Route path={`${url}/settings`} component={SettingsPage} />
        </Switch>
      </div>
    )
  }
}

export default SingleRepo
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReposPage from './ReposPage'
import SingleRepo from './SingleRepo'

class RepoRoutes extends React.Component {
	render () {
		const { path } = this.props.match

		return (
			<Switch>
				<Route path={`${path}`} exact component={ReposPage} />
        <Route path={`${path}/:id`}   component={SingleRepo} />
			</Switch>
		)
	}
}

export default RepoRoutes
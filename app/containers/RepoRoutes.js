import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReposPage from './ReposPage'
import SingleRepo from './SingleRepo'

class RepoRoutes extends React.Component {
	render () {
		const { path } = this.props.match
    console.log(this.props)
		return (
			<Switch>
				<Route path={`${path}`} exact component={ReposPage} />
        <Route path={`${path}/:id`}   component={SingleRepo} />
			</Switch>
		)
	}
}

export default RepoRoutes;

{/* <Route path={`${path}/new`}             component={NewCampusForm} />
<Route path={`${path}/:id/edit`}        component={EditCampusForm} /> */}

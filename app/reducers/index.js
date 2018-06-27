// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './user';
import repos from './repos';
import selectedRepo from './selectedRepo';
import openBranches from './openBranches';
import closedBranches from './closedBranches';
import selectedBranch from './selectedBranch';
import branchCommits from './branchCommits';
import masterCommits from './masterCommits';

const rootReducer = combineReducers({
  router,
  auth,
  repos,
  selectedRepo,
  openBranches,
  closedBranches,
  selectedBranch,
  branchCommits,
  masterCommits,
});

export default rootReducer;

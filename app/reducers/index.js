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
import selectedCommit from './selectedCommit';
import localBranches from './localBranches';
import localRepo from './localRepo';
import isLocal from './isLocal';
import localCommits from './localCommits';

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
  selectedCommit,
  localBranches,
  localRepo,
  isLocal,
  localCommits,
});

export default rootReducer;

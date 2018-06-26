// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './user';
import repos from './repos';
import selectedRepo from './selectedRepo';
import openBranches from './openBranches';

const rootReducer = combineReducers({
  router,
  auth,
  repos,
  selectedRepo,
  openBranches,
});

export default rootReducer;

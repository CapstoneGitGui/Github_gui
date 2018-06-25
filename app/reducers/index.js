// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './user';
import repos from './repos';
import selectedRepo from './selectedRepo';

const rootReducer = combineReducers({
  router,
  auth,
  repos,
  selectedRepo,
});

export default rootReducer;

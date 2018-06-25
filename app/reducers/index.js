// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './user';

const rootReducer = combineReducers({
  router,
  auth,
});

export default rootReducer;

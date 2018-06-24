// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import auth from './user';

const rootReducer = combineReducers({
  counter,
  router,
  auth,
});

export default rootReducer;

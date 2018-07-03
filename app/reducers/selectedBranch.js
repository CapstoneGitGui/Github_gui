import axios from 'axios';

export const SET_BRANCH = 'SET_BRANCH';

export const setSelectedBranch = branch => ({
  type: SET_BRANCH,
  branch,
});

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANCH:
      return action.branch;
    case 'RESET_REPO':
      return initialState;
    case 'SET_IS_LOCAL':
      return initialState;
    default:
      return state;
  }
};

export default reducer;

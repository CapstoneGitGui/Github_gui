import axios from 'axios';

const SET_REPO = 'SET_REPO';

export const setSelectedRepo = repo => ({
  type: SET_REPO,
  repo,
});

const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPO:
      return action.repo;
    default:
      return state;
  }
};

export default reducer;

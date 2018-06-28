import axios from 'axios';

const SET_REPO = 'SET_REPO';
const RESET_REPO = 'RESET_REPO';

export const setSelectedRepo = repo => ({
  type: SET_REPO,
  repo,
});

export const resetSelectedRepo = () => ({
  type: RESET_REPO,
});

const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPO:
      return action.repo;
    case RESET_REPO:
      return ''
    default:
      return state;
  }
};

export default reducer;

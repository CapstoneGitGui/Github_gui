import axios from 'axios';

export const SET_COMMIT = 'SET_COMMIT';

export const setSelectedCommit = commit => ({
  type: SET_COMMIT,
  payload: commit,
});

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMIT:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

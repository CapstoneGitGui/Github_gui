import axios from 'axios';

const FETCH_OPEN_BRANCHES = 'FETCH_OPEN_BRANCHES';

export const fetchOpenBranches = (userName, repo, token) => {
  return dispatch => {
    if (userName) {
      axios
        .get(
          `https://api.github.com/repos/${userName}/${repo}/branches?access_token=${token}`
        )
        .then(branches => {
          dispatch({ type: FETCH_OPEN_BRANCHES, branches: branches.data });
        })
        .catch(err => console.log(err));
    }
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPEN_BRANCHES:
      return action.branches;
    default:
      return state;
  }
};

export default reducer;

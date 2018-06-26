import axios from 'axios';

const FETCH_CLOSED_BRANCHES = 'FETCH_CLOSED_BRANCHES';

export const fetchClosedBranches = (userName, repo, token) => {
  return dispatch => {
    if (userName) {
      axios
        .get(
          `https://api.github.com/repos/${userName}/${repo}/pulls?state=closed&access_token=${token}`
        )
        .then(branches => {
          dispatch({ type: FETCH_CLOSED_BRANCHES, branches: branches.data });
        })
        .catch(err => console.log(err));
    }
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLOSED_BRANCHES:
      return action.branches;
    default:
      return state;
  }
};

export default reducer;

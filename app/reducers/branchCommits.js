import axios from 'axios';

const FETCH_BRANCH_COMMITS = 'FETCH_BRANCH_COMMITS';

export const fetchBranchCommits = (token, branch, userName) => {
  return dispatch => {
    if (userName && branch && branch.commits_url) {
      axios
        .get(`${branch.commits_url}?access_token=${token}`)
        .then(branches => {
          dispatch({ type: FETCH_BRANCH_COMMITS, branches: branches.data });
        })
        .catch(err => console.log(err));
    } else {
      dispatch({ type: FETCH_BRANCH_COMMITS, branches: [] });
    }
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANCH_COMMITS:
      return action.branches;
    default:
      return state;
  }
};

export default reducer;

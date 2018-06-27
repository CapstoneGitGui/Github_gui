import axios from 'axios';

const FETCH_MASTER_COMMITS = 'FETCH_MASTER_COMMITS';

export const fetchMasterCommits = (token, userName, branch, repoName) => {
  return dispatch => {
    axios
      .get(
        `https://api.github.com/repos/${userName}/${repoName}/commits?per_page=100&sha=${
          branch.commit.sha
        }&access_token=${token}`
      )
      .then(commits => {
        dispatch({ type: FETCH_MASTER_COMMITS, commits: commits.data });
      });
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_COMMITS:
      return action.commits;
    default:
      return state;
  }
};

export default reducer;

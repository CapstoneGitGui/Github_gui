import axios from 'axios';
import gitlog from 'gitlog'

const FETCH_LOCAL_COMMITS = 'FETCH_LOCAL_COMMITS';

export const fetchLocalCommits = (branch, repo) => {
  const options = {
    repo,
    number: 5000,
    branch,
    fields: [
      'hash',
      'abbrevHash',
      'treeHash',
      'abbrevTreeHash',
      'parentHashes',
      'abbrevParentHashes',
      'authorName',
      'authorEmail',
      'authorDate',
      'authorDateRel',
      'committerName',
      'committerEmail',
      'committerDate',
      'committerDateRel',
      'subject'
    ]
  };

  return dispatch => {
    gitlog(options, async (error, commits) => {
      dispatch({
        type: FETCH_LOCAL_COMMITS,
        payload: commits,
      })
    });
  }
}

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_COMMITS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

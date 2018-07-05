import axios from 'axios';

const FETCH_COMMIT_ACTIVITY = 'FETCH_COMMIT_ACTIVITY';

export const fetchCommitActivity = (userName, repo, token) => {
  return dispatch => {
    axios
      .get(
        `https://api.github.com/repos/${userName}/${repo}/stats/commit_activity?access_token=${token}`
      )
      .then(activity => {
        console.log('ACTIVITY!!!!', activity);
        dispatch({ type: FETCH_COMMIT_ACTIVITY, payload: activity });
      })
      .catch(err => console.log(err));
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMIT_ACTIVITY:
      return action.payload.data;
    default:
      return state;
  }
};

export default reducer;

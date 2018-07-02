import axios from 'axios';

const FETCH_COMMENTS = 'FETCH_COMMENTS';

export const fetchComments = (token, userName, repoName, sha) => {
  return dispatch => {
    axios.get(
      `https://api.github.com/repos/${userName}/${repoName}/commits/${sha}/comments`
    );
  };
};

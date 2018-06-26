import axios from 'axios';

const FIREBASE_URL = 'https://gitgui-55ad0.firebaseio.com/repos.json'

const FETCH_REPOS = 'FETCH_REPOS';
const ADD_REPO = 'ADD_REPO'

export const fetchRepos = (currentUser) => {
  return dispatch => {
    axios
      .get(FIREBASE_URL)
      .then(response => {
        const repos = [];
        for (let k in response.data) {
          if (response.data[k].username === currentUser) {
            repos.push(response.data[k].repoName);
          }
        }
        dispatch({ type: FETCH_REPOS, repos });
      })
      .catch(err => console.log(err));
  };
};

export const addRepo = (repo, currentUser) => {
  return dispatch => {
    axios
      .post(FIREBASE_URL, {
        repoName: repo,
        username: currentUser,
      })
      .then(res => {
        dispatch({
          type: ADD_REPO,
          payload: JSON.parse(res.config.data).repoName
        })
      })
      .catch(err => console.log(err));
  }
}

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS:
      return action.repos;
    case ADD_REPO:
      return [...state, action.payload]
    default:
      return state;
  }
};

export default reducer;

import axios from 'axios';

const FETCH_REPOS = 'FETCH_REPOS';

export const fetchRepos = (currentUser) => {
  return dispatch => {
    axios
      .get('https://gitgui-55ad0.firebaseio.com/repos.json')
      .then(response => {
        const repos = [];
        for (let k in response.data) {
          if (response.data[k].username === currentUser) {
            repos.push(response.data[k].name);
          }
        }
        dispatch({ type: FETCH_REPOS, repos });
      })
      .catch(err => console.log(err));
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS:
      return action.repos;
    default:
      return state;
  }
};

export default reducer;

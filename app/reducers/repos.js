import axios from 'axios';

const FETCH_REPOS = 'FETCH_REPOS';

export const fetchRepos = () => {
  return dispatch => {
    axios
      .get('https://gitgui-55ad0.firebaseio.com/repos.json')
      .then(response => {
        const repos = [];
        for (let k in response.data) {
          repos.push(response.data[k].name);
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

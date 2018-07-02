const SELECT_LOCAL_REPO = 'SELECT_LOCAL_REPO';

export const selectLocalRepo = dir => dispatch => {
  console.log(dir);
  dispatch({
    type: SELECT_LOCAL_REPO,
    payload: dir
  });
};

const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LOCAL_REPO:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

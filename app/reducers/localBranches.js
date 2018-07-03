const FETCH_LOCAL_BRANCHES = 'FETCH_LOCAL_BRANCHES';

export const fetchLocalBranches = branches => dispatch => {
  dispatch({
    type: FETCH_LOCAL_BRANCHES,
    payload: branches
  });
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_BRANCHES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

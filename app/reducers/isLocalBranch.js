const SET_IS_LOCAL_BRANCH =  'SET_IS_LOCAL_BRANCH';

export const setIsLocalBranch = isLocal => dispatch => {

  dispatch({
    type: SET_IS_LOCAL_BRANCH,
    payload: isLocal
  });
};

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOCAL_BRANCH:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

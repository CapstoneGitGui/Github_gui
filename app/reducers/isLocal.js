const SET_IS_LOCAL = 'SET_IS_LOCAL';

export const setIsLocal = isLocal => dispatch => {

  dispatch({
    type: SET_IS_LOCAL,
    payload: isLocal
  });
};

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOCAL:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

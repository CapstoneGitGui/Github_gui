import { push } from 'react-router-redux'

export const FETCH_USER_FROM_TOKEN = 'FETCH_USER_FROM_TOKEN'
const FETCH_USER_FROM_GITHUB = 'FETCH_USER_FROM_GITHUB'
const FETCH_USER_FROM_FIREBASE = 'FETCH_USER_FROM_FIREBASE'
const LOGOUT_USER = 'LOGOUT_USER'
const REQUEST_USER = 'REQUEST_USER'

export const fetchUserFromToken = (token) => {
  return dispatch => {
    const credential = firebase.auth.GithubAuthProvider.credential(token);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({
          type: FETCH_USER_FROM_FIREBASE,
          payload: JSON.parse(localStorage.getItem('username'))
        })
      } else {
        console.log('User not signed in')
      }
    });
    
    
  }
}

export const fetchUser = (token) => {
  return dispatch => {
    const credential = firebase.auth.GithubAuthProvider.credential(token);

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(user => {
        dispatch({
          type: FETCH_USER_FROM_GITHUB,
          payload: user.additionalUserInfo
        })
      })  
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    })
  }
}

export const requestUser = () => {
  return {
    type: REQUEST_USER
  }
}

const initialState = {
  currentUser: {},
  authenticated: false,
  isLoading: false,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_USER_FROM_FIREBASE:
    case FETCH_USER_FROM_GITHUB:
    case FETCH_USER_FROM_TOKEN:
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
        isLoading: false,
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        authenticated: false,
      }
    default:
      return state;
  }
}

export default reducer
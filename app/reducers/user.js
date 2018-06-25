const FETCH_USER_FROM_TOKEN = 'FETCH_USER_FROM_TOKEN'
const FETCH_USER_FROM_GITHUB = 'FETCH_USER_FROM_GITHUB'
const LOGOUT_USER = 'LOGOUT_USER'

export const fetchUserFromToken = (token) => {
  return dispatch => {
    const credential = firebase.auth.GithubAuthProvider.credential(token);

    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(user => {
        dispatch({
          type: FETCH_USER_FROM_TOKEN,
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

const initialState = {
  currentUser: {},
  authenticated: false,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case FETCH_USER_FROM_GITHUB:
    case FETCH_USER_FROM_TOKEN:
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
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

// signinUser: ({ username, password }, history) => {
//   return (dispatch) => {
//     axios.post('/api/login', { username, password })
//     .then(res => {
//       console.log(res)
//       dispatch({ 
//         type: authActions.AUTH_USER, 
//         payload: res.data.user 
//       });

//       localStorage.setItem('token', res.data.token);

//       // Redirect
//       history.push('/dashboard')
//     })
//     .catch(e => dispatch(authActions.authError('Invalid email or password. Please try again')))
//   }
// },

// import authActions from '../actions/auth';

// const { AUTH_USER, UNAUTH_USER, AUTH_ERROR, UPDATE_USER } = authActions;

// const initialState = {
//   errorMessage: '',
//   authenticated: localStorage.getItem('token') ? true : false,
//   currentUser: {}
// }

// const authReducer = (state=initialState, action) => {
//   switch (action.type) {
//     case AUTH_USER:
//       return { 
//         ...state, 
//         errorMessage: '', 
//         authenticated: true, 
//         currentUser: action.payload 
//       };
//     case AUTH_ERROR:
//       return { 
//         ...state, 
//         errorMessage: action.payload 
//       };
//     case UNAUTH_USER:
//       return { 
//         ...state, 
//         authenticated: false,
//         currentUser: {} 
//       };
//     case UPDATE_USER:
//       return {
//         ...state,
//         currentUser: action.payload
//       }
//     default:
//       return state;
//   }
// }

// export default authReducer;
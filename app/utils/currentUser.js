import {FETCH_USER_FROM_TOKEN} from '../reducers/user';
import {configureStore} from '../store/configureStore';

const token = localStorage.getItem('token');
const store = configureStore()

if (token) {
  console.log('token exists')
  fetchUser();  
}

function fetchUser () {
  const credential = firebase.auth.GithubAuthProvider.credential(token);
  
  firebase
    .auth()
    .signInAndRetrieveDataWithCredential(credential)
    .then(user => {
      store.dispatch({
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

export default fetchUser;
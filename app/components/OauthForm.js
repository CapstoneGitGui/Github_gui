// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Home.css';
// import { ipcRenderer } from 'electron';

// type Props = {};

// class OauthForm extends Component {
//   createWindow () {
//     ipcRenderer.send('oauth:form', 'hello world')
//   }

//   render() {
//     return (
//       <div>
//         <div className={styles.container} data-tid="container">
//           <h2>Home</h2>
//           <Link to="/counter">to Counter</Link>
//           <button onClick={this.createWindow}>Login with Github</button>
//         </div>
//       </div>
//     );
//   }
// }


// export default OauthForm
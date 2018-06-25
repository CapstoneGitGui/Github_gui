// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { BrowserWindow } from 'electron';
// import apiRequests from 'superagent';
// import axios from 'axios';

// type Props = {};

// export default class GithubLogin extends Component<Props> {
//   props: Props;

//   componentDidMount () {
//     // Your GitHub Applications Credentials
// const options = {
//   client_id: process.env.GITHUB_CLIENT_ID,
//   client_secret: process.env.GITHUB_CLIENT_SECRET,
//   scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
// };

// // Build the OAuth consent page URL
// let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
// let githubUrl = 'https://github.com/login/oauth/authorize?';
// let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
// authWindow.loadURL(authUrl);
// authWindow.show();

// function handleCallback (url) {
// let raw_code = /code=([^&]*)/.exec(url) || null;
// let code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
// let error = /\?error=(.+)$/.exec(url);

// if (code || error) {
//   // Close the browser if code found or error
//   authWindow.destroy();
// }

// // If there is a code, proceed to get token from github
// if (code) {
//   self.requestGithubToken(options, code);
// } else if (error) {
//   alert('Oops! Something went wrong and we couldn\'t' +
//     'log you in using Github. Please try again.');
// }
// }

// // Handle the response from GitHub - See Update from 4/12/2015

// authWindow.webContents.on('will-navigate', function (event, url) {
// handleCallback(url);
// });

// authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
// handleCallback(newUrl);
// });

// // Reset the authWindow on close
// authWindow.on('close', function() {
//   authWindow = null;
// }, false);

// let requestGithubToken = function (options, code) {

//   axios
//     .post('https://github.com/login/oauth/access_token', {
//       client_id: options.client_id,
//       client_secret: options.client_secret,
//       code: code,
//     })
//     .end(function (err, response) {
//       if (response && response.ok) {
//         // Success - Received Token.
//         // Store it in localStorage maybe?
//         window.localStorage.setItem('githubtoken', response.body.access_token);
//       } else {
//         // Error - Show messages.
//         console.log(err);
//       }
//     });

// }
//   }

//   render() {
//     return (
//       <div>
//         <div className={styles.container} data-tid="container">
//           <h2>Home</h2>
//           <Link to="/counter">to Counter</Link>
//         </div>
//       </div>
//     );
//   }
// }

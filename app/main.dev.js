import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import axios from 'axios'

let mainWindow = null;
let authWindow;

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    frame: false,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

process.env.GITHUB_CLIENT_ID = 'fb74e5d5d3978c4d6c87';
process.env.GITHUB_CLIENT_SECRET = '9067dcb77f4aad174472cc1a62b2d3b16908f520';
process.env.GITHUB_CALLBACK = 'http://localhost:1212/auth/github/callback';

const githubUrl = 'https://github.com/login/oauth/authorize?';
let authUrl = githubUrl + 'client_id=' + process.env.GITHUB_CLIENT_ID + '&scope=' + process.env.GITHUB_CLIENT_SECRET;

// Github Oauth Form Window
ipcMain.on('oauth:form', (data) => {
  authWindow = new BrowserWindow({
    width: 385,
    height: 800,
    'node-integration': false 
  })
  authWindow.loadURL(authUrl)

  function requestGithubToken (code) {
    axios
      .post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      })
      .then(res => {
        console.log(res)
        const token = parseQuery(res.data).access_token
        mainWindow.webContents.send('token:send', token)
 
      })
      .catch(err => console.log(err))
  }
  

  function handleCallback (url) {
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);
  
    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy();
    }
  
    // If there is a code, proceed to get token from github
    if (code) {
      console.log('[CODE]: Success')
      requestGithubToken(code);
    } else if (error) {
      console.log('[CODE]: Error')
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.');
    }
  }
  
  
  authWindow.webContents.on('will-navigate', (e, url) => {
    handleCallback(url)
  })

  authWindow.webContents.on('did-get-redirect-request', (e, oldUrl, newUrl) => {
    handleCallback(newUrl)
  })
})
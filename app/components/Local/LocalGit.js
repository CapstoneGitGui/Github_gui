import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

const { dialog } = require('electron').remote;
const shell = require('shelljs');
const fs = require('fs');
const zlib = require('zlib');
const gitlog = require('gitlog');

// https://www.npmjs.com/package/simple-git
// https://www.npmjs.com/package/js-git
// chokidar
// https://www.npmjs.com/package/nodegit
// https://www.npmjs.com/package/git-utils

class LocalGit extends Component<Props> {
  props: Props;

  state = {
    folderPath: '',
    branches: [],
    commits: []
  };

  selectFolder = () => {
    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      async folderPath => {
        // folderPaths is an array that contains all the selected paths
        await fs.readdir(`${folderPath}/.git/refs/heads`, (err, files) => {
          const branches = [];
          files.forEach(file => {
            branches.push(file);
          });
          this.setState({ branches });
        });
        this.setState({ folderPath });
        console.log(folderPath);
      }
    );
  };

  viewCommits = async (evt, branch) => {
    const options = {
      repo: `${this.state.folderPath}`,
      number: 30,
      branch,
      fields: ['hash', 'abbrevHash', 'subject', 'authorName', 'authorDateRel']
    };
    console.log(options.repo);
    gitlog(options, async (error, commits) => {
      console.log(commits);
      this.setState({ commits });
    });
  };

  render() {
    return (
      <div>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
        <ul>
          {this.state.branches.map(branch => (
            <li className="text">
              <Button onClick={evt => this.viewCommits(evt, branch)}>
                {branch}
              </Button>
            </li>
          ))}
        </ul>
        <div className="text">
          {this.state.commits.map(commit => (
            <div className="text">{commit.subject}</div>
          ))}
        </div>
      </div>
    );
  }
}

// await fs.readFile(
//   `${this.state.folderPath}/.git/refs/heads/${branch}`,
//   async (err, file) => {
//     if (err) throw err;
//     const fileSHA = file.toString().slice(2, -1);
//     const fileSUB = file.toString().slice(0, 2);
//     await fs.readFile(
//       `${this.state.folderPath}/.git/objects/${fileSUB}/${fileSHA}`,
//       (err, file) => {
//         if (err) throw err;
//         const buffer = Buffer.from(file, 'base64');
//         zlib.unzip(buffer, (err, buffer) => {
//           if (!err) {
//             const leadCommit = buffer.toString().split(' ');
//             console.log(leadCommit);
//             this.viewCommits(leadCommit);
//           } else {
//             console.log(err);
//           }
//         });
//       }
//     );
//   }
// );

// dialog.showOpenDialog(
//   {
//     title: 'Select a folder',
//     properties: ['openDirectory']
//   },
//   folderPaths => {
//     // folderPaths is an array that contains all the selected paths
//     if (fileNames === undefined) {
//       console.log('No destination folder selected');
//       return;
//     } else {
//       console.log(folderPaths);
//     }
//   }
// );

export default LocalGit;

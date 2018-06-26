import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

const { dialog } = require('electron').remote;
const shell = require('shelljs');
const fs = require('fs');
const zlib = require('zlib');

class LocalGit extends Component<Props> {
  props: Props;

  state = {
    folderPath: '',
    branches: []
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
      }
    );
  };

  showCommits = async (evt, branch) => {
    console.log(branch);
    await fs.readFile(
      `${this.state.folderPath}/.git/refs/heads/${branch}`,
      async (err, file) => {
        if (err) throw err;
        const fileSHA = file.toString().slice(2, -1);
        const fileSUB = file.toString().slice(0, 2);
        console.log(fileSHA, fileSUB);
        await fs.readFile(
          `${this.state.folderPath}/.git/objects/${fileSUB}/${fileSHA}`,
          (err, file) => {
            if (err) throw err;
            const buffer = Buffer.from(file, 'base64');
            zlib.unzip(buffer, (err, buffer) => {
              if (!err) {
                console.log(buffer.toString());
              } else {
                console.log(err);
              }
            });
          }
        );
      }
    );
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
              <Button onClick={evt => this.showCommits(evt, branch)}>
                {branch}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

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

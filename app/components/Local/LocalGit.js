import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

const { dialog } = require('electron').remote;
const shell = require('shelljs');
const fs = require('fs');

class LocalGit extends Component<Props> {
  props: Props;

  state = {
    folderPath: [],
    objects: []
  };

  selectFolder = () => {
    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      async folderPath => {
        // folderPaths is an array that contains all the selected paths
        await fs.readdir(`${folderPath}/.git/objects`, (err, files) => {
          files.forEach(file => {
            console.log(file);
          });
          // });
        });
      }
    );
  };

  render() {
    return (
      <div>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
        <div className="text">{this.state.objects}</div>
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

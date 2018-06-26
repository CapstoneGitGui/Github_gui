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
    folderPath: []
  };

  // async getBlobs() {
  //   await fs.readdir('.git/objects', (err, files) => {
  //     files.forEach(file => {
  //       console.log(file);
  //     });
  //     // });
  //   });
  // }

  selectFolder = () => {
    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      folderPath => {
        // folderPaths is an array that contains all the selected paths
        this.setState({
          folderPath
        });
        console.log(this.state.folderPath);
      }
    );
  };

  render() {
    return (
      <div>
        <div className="text">{this.state.folderPath[0]}</div>
        <Button color="blue" onClick={this.getBlobs}>
          View Objects
        </Button>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
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

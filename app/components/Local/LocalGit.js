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

  getBlobs = async () => {
    const objects = [];
    await fs.readdir(`${this.state.folderPath}/.git/objects`, (err, files) => {
      files.forEach(file => {
        objects.push(file);
      });
      // });
    });
    this.setState({
      objects
    });
  };

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
        console.log(folderPath);
      }
    );
  };

  render() {
    return (
      <div>
        <Button color="blue" onClick={this.getBlobs}>
          View Objects
        </Button>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
        {this.state.folderPath.length > 0 ? (
          <div>
            <Button onClick={this.getBlobs}>View Tree</Button>
          </div>
        ) : null}
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

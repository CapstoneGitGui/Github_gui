import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';

const shell = require('shelljs');
const fs = require('fs');

class LocalGit extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async getBlobs() {
    await fs.readdir('.git/objects', (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });
  }

  render() {
    return (
      <div>
        <Button color="blue" onClick={this.getBlobs}>
          View Objects
        </Button>
      </div>
    );
  }
}

export default LocalGit;

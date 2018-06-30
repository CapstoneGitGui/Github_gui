import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';
import ContentWrapper from '../UI/ContentWrapper';
import CommitsList from '../Commits/CommitsList';
import SelectedCommit from '../Commits/SelectedCommit';
import Column from '../UI/Column';
import LocalWork from './LocalWork';
import git from 'simple-git';

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
    commits: [],
    branch: ''
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

  selectBranch = async (evt, branch) => {
    this.setState({ branch });
    this.viewCommits(branch);
  };

  viewCommits = async branch => {
    const options = {
      repo: `${this.state.folderPath}`,
      number: 5000,
      branch,
      fields: [
        'hash',
        'abbrevHash',
        'subject',
        'parentHashes',
        'authorName',
        'authorDateRel'
      ]
    };
    gitlog(options, async (error, commits) => {
      console.log(commits);
      this.setState({ commits });
    });
  };

  addChanges = async () => {
    git(this.state.folderPath[0]).add('./*');
  };

  commit = async () => {
    git(this.state.folderPath[0]).commit('cool');
  };

  render() {
    // const watcher = chokidar.watch(`${this.state.folderPath}/.git/objects`, {
    //   persistent: true
    // });

    return (
      <div>
        <div id="drag">Drop Project Here</div>
        <Button color="blue" onClick={this.selectFolder}>
          Select folder
        </Button>
        <Button onClick={this.addChanges}>Add</Button>
        <Button onClick={this.commit}>Commit</Button>
        <ul>
          {this.state.branches.map(branch => (
            <li key={branch} className="text">
              <Button onClick={evt => this.selectBranch(evt, branch)}>
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
        {/* <div>
          {this.state.branch ? (
            <ContentWrapper>
              <Column className="right">
                <LocalWork />
              </Column>
              <Column className="left">
                <div>{this.state.commits.map(commit => commit.subject)}</div>
              </Column>
            </ContentWrapper>
          ) : null}
        </div> */}
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

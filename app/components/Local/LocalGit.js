import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button } from 'react-desktop/macOs';
import ContentWrapper from '../UI/ContentWrapper';
import CommitsList from '../Commits/CommitsList';
import SelectedCommit from '../Commits/SelectedCommit';
import Header from '../UI/Header';
import Column from '../UI/Column';
import git from 'simple-git';
import Aside from '../Nav/Aside/Aside.js';
import chokidar from 'chokidar';
import { fetchLocalBranches } from '../../reducers/localBranches';
import { selectLocalRepo } from '../../reducers/localRepo';
import SplitPane from 'react-split-pane';
import _ from 'lodash';

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
    branches: [],
    commits: [],
    branch: '',
    changedFiles: [],
    modified: [],
    staged: [],
    commitMessage: '',
    added: false
  };

  componentDidMount = () => {
    this.changedFiles();
  };

  watch = () => {
    const watcher = chokidar.watch(this.props.selectedRepo, {
      ignored: /[\/\\]\./,
      persistent: true
    });

    watcher.on('change', path => {
      this.setState({ changedFiles: [...this.state.changedFiles, path] });
      console.log(`${path} file has been changed`);
    });
  };

  selectFolder = () => {
    const { fetchLocalBranches, selectLocalRepo } = this.props;

    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      async folderPath => {
        await fs.readdir(`${folderPath}/.git/refs/heads`, (err, files) => {
          const branches = [];
          files.forEach(file => {
            branches.push(file);
          });
          this.setState({ branches });
          fetchLocalBranches(branches);
        });
        selectLocalRepo(folderPath[0]);
        this.changedFiles();
        this.watch();
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
    git(this.props.selectedRepo).add('./*', el => {
      this.setState({ added: true });
      this.changedFiles();
    });
  };

  changedFiles = async () => {
    // if (this.props.selectedRepo) {
    git(this.props.selectedRepo).status((err, data) => {
      console.log(data.modified, data.staged);
      this.setState({ modified: data.modified, staged: data.staged });
    });
    // }
  };

  commit = async msg => {
    git(this.props.selectedRepo).commit(msg);
    this.setState({ modified: [] });
  };

  listRemote = () => {
    const chosenDirectory = this.props.selectedRepo;
    git(chosenDirectory).listRemote(['--get-url'], (err, data) => {
      if (!err) {
        console.log(`Remote url for repository at ${chosenDirectory}:`);
        console.log(data);
      }
    });
  };

  handleChange = evt => {
    this.setState({ commitMessage: evt.target.value });
  };

  commitChange = async evt => {
    evt.preventDefault();
    this.commit(this.state.commitMessage);
  };

  render() {
    const { folderPath } = this.state;
    // const watcher = chokidar.watch(`${this.state.folderPath}/.git/objects`, {
    //   persistent: true
    // });
    console.log(this.state);
    return (
      <ContentWrapper>
        <Column className="right">
          <Header>Hello</Header>
          <Button color="blue" onClick={this.selectFolder}>
            Select folder
          </Button>
          <form
            action="/my-handling-form-page"
            method="post"
            onSubmit={this.commitChange}
          >
            <div>
              <label htmlFor="msg">Message:</label>
              <textarea
                id="msg"
                name="user_message"
                onChange={this.handleChange}
              />
            </div>

            {this.state.added ? <div>Files have been Staged</div> : null}
            <Button onClick={this.addChanges}>Stage Changes</Button>
            <Button type="submit">Commit</Button>
          </form>
          <h3>Modified Files</h3>
          <ul>
            {this.state.modified.map(file => {
              if (!this.state.staged.includes(file)) {
                return (
                  <li key={file} className="text">
                    {file}
                  </li>
                );
              }
            })}
          </ul>
          <h3>Staged</h3>
          <ul>
            {this.state.staged.map(file => (
              <li key={file} className="text">
                {file}
              </li>
            ))}
          </ul>
          <ul />
        </Column>
        <Column className="left">Hello</Column>
      </ContentWrapper>

      // <div>
      //   <div id="drag">Drop Project Here</div>
      //   <Button color="blue" onClick={this.selectFolder}>
      //     Select folder
      //   </Button>
      //   <Button color="blue" onClick={this.listRemote}>
      //     List remote
      //   </Button>
      //   <Button onClick={this.addChanges}>Add</Button>
      //   <Button onClick={this.commit}>Commit</Button>

      //   <div className="text">
      //     {this.state.commits.map(commit => (
      //       <div key={commit.hash} className="text">
      //         {commit.subject}
      //       </div>
      //     ))}
      //   </div>
      //   <Button onClick={this.changedFiles}>Changed Files</Button>
      //   {this.state.modified ? (
      //     <ul>
      //       {this.state.modified.map(file => (
      //         <li key={file.file} className="text">
      //           {file.file}
      //         </li>
      //       ))}
      //     </ul>
      //   ) : null}
      // </div>
    );
  }
}

const mapSTP = state => ({
  selectedRepo: state.localRepo
});

export default connect(
  mapSTP,
  {
    selectLocalRepo,
    fetchLocalBranches
  }
)(LocalGit);

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

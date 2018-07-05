import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button, TextInput } from 'react-desktop/macOs';
import ContentWrapper from '../UI/ContentWrapper';
import CommitsList from '../Commits/CommitsList';
import SelectedCommit from '../Commits/SelectedCommit';
import Header from '../UI/Header';
import Column from '../UI/Column';
import git from 'simple-git';
import Aside from '../Nav/Aside/Aside.js';
// import chokidar from 'chokidar';
import { fetchLocalBranches } from '../../reducers/localBranches';
import { selectLocalRepo } from '../../reducers/localRepo';
import SplitPane from 'react-split-pane';
import File from './File';
import ModifiedFiles from './ModifiedFiles';
import StagedFiles from './StagedFiles';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import Highlight from 'react-highlight';

const { dialog } = require('electron').remote;
const shell = require('shelljs');
const fs = require('fs');
const zlib = require('zlib');
const gitlog = require('gitlog');

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
    added: false,
    diff: '',
    allDiffs: [],
    currentBranch: '',
    remote: ''
  };

  componentDidMount = () => {
    git(this.props.selectedRepo).branch((err, branches) => {
      this.setState({ currentBranch: branches.current });
    });
    this.listRemote();
    this.changedFiles();
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
        // this.watch();
      }
    );
  };

  // watch = () => {
  //   const watcher = chokidar.watch(this.props.selectedRepo, {
  //     ignored: /[\/\\]\./,
  //     persistent: true
  //   });

  //   watcher.on('change', path => {
  //     this.setState({ changedFiles: [...this.state.changedFiles, path] });
  //     console.log(`${path} file has been changed`);
  //   });
  // };

  selectBranch = async (evt, branch) => {
    this.setState({ branch });
    this.viewCommits(branch);
  };

  viewCommits = async branch => {
    const options = {
      repo: `${this.props.selectedRepo}`,
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

  listRemote = () => {
    const chosenDirectory = this.props.selectedRepo;
    git(chosenDirectory).listRemote(['--get-url'], (err, data) => {
      if (!err) {
        this.setState({ remote: data });
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
    this.setState({ modified: [], staged: [], commitMessage: '' });
  };

  changedFiles = async () => {
    if (this.props.selectedRepo) {
      git(this.props.selectedRepo).status((err, data) => {
        this.setState({ modified: data.modified, staged: data.staged });
      });
    }
  };

  diffView = (boolean, name) => {
    const fileType = boolean ? [name] : ['--staged', name];
    git(this.props.selectedRepo).diff(fileType, (err, data) => {
      this.setState({ diff: data });
    });
  };

  branch = () => {
    git(this.props.selectedRepo).branch((err, branches) => {
      this.setState({ currentBranch: branches.current });
    });
  };

  addChanges = async () => {
    git(this.props.selectedRepo).add('./*', el => {
      this.setState({ added: true });
      this.changedFiles();
    });
  };

  commit = async msg => {
    git(this.props.selectedRepo).commit(msg);
  };

  push = () => {
    git(this.props.selectedRepo).push([
      '-u',
      'origin',
      `${this.state.currentBranch}`
    ]);
  };

  renderForm() {
    return (
      <div className="commit-form">
        <form onSubmit={this.commitChange}>
          <TextInput
            placeholder="Commit Message"
            value={this.state.commitMessage}
            onChange={this.handleChange}
          />
          <div className="form-buttons">
            <Button onClick={this.addChanges}>Stage</Button>
            <Button type="submit">Commit</Button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { folderPath, staged, modified } = this.state;

    return (
      <ContentWrapper>
        <Column className="right">
          <Header>
            <div className="flex space-between">
              <div className="align-self-center">
                Branch
                {this.props.selectedRepo
                  ? `:  ${this.state.currentBranch}`
                  : null}
              </div>
              <div className="button-groups">
                <Button id="push" onClick={this.push}>
                  &uarr;
                </Button>
                <Button id="pull" onClick={this.pull}>
                  &darr;
                </Button>
              </div>
            </div>
          </Header>
          {this.renderForm()}
          <ModifiedFiles
            staged={staged}
            diffView={this.diffView}
            modified={modified}
          />
          <StagedFiles diffView={this.diffView} staged={staged} />
        </Column>
        <Column className="left">
          <Header>File Changes</Header>
          <Highlight className="diff">{this.state.diff}</Highlight>
        </Column>
      </ContentWrapper>
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

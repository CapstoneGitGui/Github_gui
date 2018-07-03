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
    added: false,
    diff: ''
  };

  componentDidMount = () => {
    this.changedFiles();
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
    if (this.props.selectedRepo) {
      git(this.props.selectedRepo).status((err, data) => {
        this.setState({ modified: data.modified, staged: data.staged });
      });
    }
  };

  commit = async msg => {
    git(this.props.selectedRepo).commit(msg);
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
    this.setState({ modified: [], staged: [], commitMessage: '' });
  };

  diff = () => {
    git(this.props.selectedRepo).diffSummary((err, data) => {
      console.log(data);
    });
  };

  diffView = () => {
    git(this.props.selectedRepo).diff((err, data) => {
      this.setState({ diff: data });
    });
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
          {this.state.added ? <div>Files have been Staged</div> : null}
          <div className="form-buttons">
            <Button onClick={this.addChanges}>Stage Changes</Button>
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
          <Header>Hello</Header>
          {this.renderForm()}
          <ModifiedFiles
            diffView={this.diffView}
            modified={modified}
            staged={staged}
          />
          <StagedFiles diffView={this.diffView} staged={staged} />
        </Column>
        <Column className="left">
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

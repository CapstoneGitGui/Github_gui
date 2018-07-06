import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router';
import { ipcRenderer } from 'electron';
import { Button, TextInput, Dialog, Window, TitleBar, Text } from 'react-desktop/macOs';
import ContentWrapper from '../UI/ContentWrapper';
import CommitsList from '../Commits/CommitsList';
import SelectedCommit from '../Commits/SelectedCommit';
import Header from '../UI/Header';
import Column from '../UI/Column';
import git from 'simple-git';
import Aside from '../Nav/Aside/Aside.js';
import { fetchLocalBranches } from '../../reducers/localBranches';
import { selectLocalRepo } from '../../reducers/localRepo';
import SplitPane from 'react-split-pane';
import File from './File';
import ModifiedFiles from './ModifiedFiles';
import StagedFiles from './StagedFiles';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import Highlight from 'react-highlight';
import Modal from 'react-modal';

const { dialog } = require('electron').remote;
const shell = require('shelljs');
const fs = require('fs');
const zlib = require('zlib');
const gitlog = require('gitlog');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

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
    remote: '',
    err: false,
    modalIsOpen: false,
    modalIsOpen2: false,
  };

  componentDidMount = async () => {
    await this.changedFiles();
    await git(this.props.selectedRepo).branch((err, branches) => {
      this.setState({
        currentBranch: branches.current,
        branches: branches.all
      });
    });
    await this.listRemote();
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

  changedFiles = () => {
    if (this.props.selectedRepo) {
      git(this.props.selectedRepo).status((err, data) => {
        console.log(data);
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
    if (this.state.modalIsOpen) {
      this.closeModal()
      this.setState({modalIsOpen2: true})
    }
  };

  pull = () => {
    git(this.props.selectedRepo).pull('origin', 'master');
  };

  checkout = evt => {
    git(this.props.selectedRepo).checkout(
      [`${evt.target.value}`],
      (err, data) => {
        if (err) this.setState({ err: true });
        else this.setState({ err: false });
      }
    );
    this.setState({ currentBranch: evt.target.value });
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

  openModal = () => {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal = () => {
    this.setState({modalIsOpen: false});

    if (this.state.modalIsOpen2) {
      this.setState({modalIsOpen2: false})
    }
  }

  render() {
    const { folderPath, staged, modified } = this.state;
    console.log(this.state)
    return (
      <ContentWrapper>
        <Column className="right">
          <Header>
            <div className="flex space-between">
              <div className="align-self-center">
                <i className="fas fa-code-branch" />
                {this.props.selectedRepo
                  ? `  ${this.state.currentBranch}`
                  : null}
              </div>
              <div className="button-groups">
                <Button id="push" onClick={this.openModal}>
                  &uarr;
                </Button>
                <Button id="pull" onClick={this.pull}>
                  &darr;
                </Button>
                <select onChange={this.checkout}>
                  <option selected="selected">Checkout Branch</option>
                  {this.state.branches.map(branch => (
                    <option value={branch}>{branch}</option>
                  ))}
                </select>
                {this.state.err ? <div>&#x2718;</div> : null}
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
          <Header className="flex">
            <div className="align-self-center">File Changes</div>
          </Header>
          <Highlight className="diff">{this.state.diff}</Highlight>
        </Column>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <Dialog
            title="Are you sure you want to push?"
            message="You are about to push to your remote branch."
            buttons={[
              <Button onClick={this.closeModal}>Cancel</Button>,
              <Button color="blue" onClick={this.push}>Submit</Button>,
            ]}
          />
        </Modal>
        <Modal
          isOpen={this.state.modalIsOpen2}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <Dialog
            title="Successfully pushed!"
            buttons={[
              <Button color="blue" onClick={this.closeModal}>Ok</Button>,
            ]}
          />
        </Modal>
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

import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import Header from '../UI/Header';
// import {setSelectedCommit} from '../../reducers/selectedCommit'
import SmoothCollapse from 'react-smooth-collapse'
import Patches from '../Patch/Patches'
import CommitDetails from './CommitDetails'
import { SegmentedControl, SegmentedControlItem, Text } from 'react-desktop/macOs';
import CommitTree from '../Repo/CommitTree';

class SelectedCommit extends React.Component {
  constructor() {
    super();
    this.state = { isTree: false }
  }

  handleButtonTrue = () => {
    this.setState({
      isTree: true
    })
  }

  handleButtonFalse = () => {
    this.setState({
      isTree: false
    })
  }

  render () {
    const { commit } = this.props;
    console.log(commit)
    return (
      <div className="commit-single-content">
        <div className="commit-info-header">
          <Header>
            <div className="code muted">{commit.sha.substr(0,8)}</div>
            <button type='button' onClick={this.handleButtonFalse}>Changeset</button>
            <button type='button' onClick={this.handleButtonTrue} >Tree</button>
          </Header>
          {
            this.state.isTree?
            (<CommitTree sha={commit.sha}/>):
            (<CommitDetails commit={commit} />)
          }
        </div>
      </div>
    )
  }
}

export default connect(null)(SelectedCommit)

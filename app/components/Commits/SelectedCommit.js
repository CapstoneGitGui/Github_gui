import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import Header from '../UI/Header';
// import {setSelectedCommit} from '../../reducers/selectedCommit'
import SmoothCollapse from 'react-smooth-collapse'
import Patches from '../Patch/Patches'
import CommitDetails from './CommitDetails'
import { SegmentedControl, SegmentedControlItem, Text, Button } from 'react-desktop/macOs';
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

    return (
      <div className="commit-single-content">
        <div className="commit-info-header">
          <Header>
            <div className="flex space-between">
              <div className="code muted align-self-center">
                {commit.sha.substr(0,8)}
              </div>
              <div className="button-group">
                <Button type='button' onClick={this.handleButtonFalse}>Changeset</Button>
                <Button type='button' onClick={this.handleButtonTrue} >Tree</Button>
              </div>
            </div>
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

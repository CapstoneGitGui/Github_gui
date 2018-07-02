import React from 'react';
import {connect} from 'react-redux'
import Column from '../UI/Column'
import ContentWrapper from '../UI/ContentWrapper';
import Header from '../UI/Header';
import CommitsList from '../Commits/CommitsList'
import SelectedCommit from '../Commits/SelectedCommit'

class HistoryPage extends React.Component {
  // constructor(props) {
  //   super(props) {
  //     this.state = {

  //     }
  //   }
  // }


  // componentDidMount () {

  // }


  renderCommit () {
    const {selectedCommit} = this.props

    if (Object.keys(selectedCommit).length) {
      return <SelectedCommit commit={selectedCommit} />
    }
  }

	render() {
    const {
      match: { params },
      selectedCommit,
    } = this.props

    return (
      <ContentWrapper>
        <Column className='right'>
          <Header>
            {params.id}
          </Header>
          <CommitsList />
        </Column>
        <Column className='left'>
          { this.renderCommit() }
        </Column>
      </ContentWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    selectedCommit: state.selectedCommit,
    selectedRepoCommits: state.masterCommits
  }
}

export default connect(mapStateToProps)(HistoryPage)


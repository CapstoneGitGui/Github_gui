import React from 'react';
import { connect } from 'react-redux';
import Column from '../UI/Column';
import ContentWrapper from '../UI/ContentWrapper';
import Header from '../UI/Header';
import CommitsList from '../Commits/CommitsList';
import SelectedCommit from '../Commits/SelectedCommit';
import SplitPane from 'react-split-pane';

class BranchesPage extends React.Component {
  renderBranchName(selectedBranch) {
    return selectedBranch.name
      ? selectedBranch.name
      : typeof selectedBranch === 'string'
        ? selectedBranch
        : !selectedBranch.head
          ? ''
          : selectedBranch.head.ref;
  }

  renderCommit() {
    const { selectedCommit } = this.props;

    if (Object.keys(selectedCommit).length) {
      return <SelectedCommit commit={selectedCommit} />;
    }
  }

  render() {
    const {
      match: { params },
      selectedCommit,
      selectedBranch,
    } = this.props;
    console.log('hey hey', selectedBranch);
    return (
      <ContentWrapper>
        <Column className="right">
          <Header>{this.renderBranchName(selectedBranch)}</Header>
          <CommitsList />
        </Column>
        <Column className="left">{this.renderCommit()}</Column>
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCommit: state.selectedCommit,
    selectedBranch: state.selectedBranch,
  };
}

export default connect(mapStateToProps)(BranchesPage);

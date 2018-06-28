import React from 'react';
import Column from '../UI/Column'
import ContentWrapper from '../UI/ContentWrapper';
import Header from '../UI/Header';
import CommitsList from '../Commits/CommitsList'

class BranchesPage extends React.Component {
  render() {
    const {
      match: { params }
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
          Hello world
        </Column>
      </ContentWrapper>
    );
  }
}

export default BranchesPage
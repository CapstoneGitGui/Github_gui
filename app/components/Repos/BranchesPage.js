import React from 'react';
import Column from '../UI/Column'
import ContentWrapper from '../UI/ContentWrapper';

class BranchesPage extends React.Component {
	render () {
		return (
      <ContentWrapper>
        <Column className='right'>
          Branches
        </Column>
        <Column className='left'>
          hello 
        </Column>
      </ContentWrapper>
    )
	}
}

export default BranchesPage;
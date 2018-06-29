import React from 'react';
import styles from './ContentWrapper.css'

class ContentWrapper extends React.Component {
  render () {
    return (
      <div className={styles.content_wrapper}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentWrapper
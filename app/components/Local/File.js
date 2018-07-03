import React from 'react';

class File extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="file" onClick={() => this.props.diffView()}>
        <div className="file-header">
          <div className="file-header-committer">{name}</div>
        </div>
      </div>
    );
  }
}

export default File;

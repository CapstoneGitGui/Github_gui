import React from 'react';

class File extends React.Component {
  render() {
    const { boolean, name } = this.props;

    return (
      <div className="file" onClick={evt => this.props.diffView(boolean, name)}>
        <div className="file-header">
          <div className="file-header-committer">{name}</div>
        </div>
      </div>
    );
  }
}

export default File;

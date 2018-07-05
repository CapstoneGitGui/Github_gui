import React from 'react';
import File from './File';

class ModifiedFiles extends React.Component {
  render() {
    const { modified, staged, diffView } = this.props;

    return (
      <div className="modified-files">
        <div className="files-info muted">Modified</div>
        <div className="changed-files">
          {modified.map((file, index) => {
            if (!staged.includes(file)) {
              return (
                <File boolean diffView={diffView} key={index} name={file} />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ModifiedFiles;

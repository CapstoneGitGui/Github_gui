import React from 'react'
import File from './File'

class ModifiedFiles extends React.Component {
  render () {
    const {
      modified,
      staged,
    } = this.props;

    return (
      <div className="modified-files">
        <div className='files-info muted'>
          Modified Files
        </div>
        <div className="changed-files">
          {
            modified.map((file, index) => {
              if (!staged.includes(file)) {
                return (
                  <File key={index} name={file} />
                );
              }
            })
          }
        </div>
      </div>
    )
  }
}

export default ModifiedFiles
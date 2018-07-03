import React from 'react'
import File from './File'

class StagedFiles extends React.Component {
  render () {
    const {
      staged,
    } = this.props;

    return (
      <div className="staged-files">
        <div className='files-info muted'>
          Staged
        </div>
        <div className="changed-files">
          {
            staged.map((file, index) => (
              <File key={index} name={file} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default StagedFiles
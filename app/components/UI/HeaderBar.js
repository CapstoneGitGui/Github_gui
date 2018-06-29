import React from 'react'
import { TitleBar, Toolbar, SearchField } from 'react-desktop/macOs';

class HeaderBar extends React.Component {
  render () {
    return (
      <div style={{WebkitAppRegion: 'drag'}}>
        <TitleBar 
          controls 
          inset 
          onCloseClick={() => console.log('Close window')}
          onMinimizeClick={() => console.log('Minimize window')}
          onMaximizeClick={() => console.log('Mazimize window')}
        >
          <Toolbar height="50" horizontalAlignment="right">
            <SearchField
              placeholder="Search"
              defaultValue=""
            />
          </Toolbar>
        </TitleBar>
      </div>
    )
  }
}

export default HeaderBar
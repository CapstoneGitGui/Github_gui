import React from 'react';

class RemoteRepoButton extends React.Component {
  state = {
    active: false,
  }

  toggle = () => {
    
    this.setState({
      active: !this.state.active
    })

    console.log(this.state)
  }

	render () {
		return (
      <div onClick={this.toggle} className="remote-repo">
        <label  className={`btn btn-sm btn-default btn-block ${this.state.active ? 'active': null}`}> 
          <input type="checkbox" name="options" id="option2" value={this.props.name} /> 
            {this.props.name}
        </label>
      </div>
    )
	}
}

export default RemoteRepoButton;
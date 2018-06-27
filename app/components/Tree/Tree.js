import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'
import styles from './styles'

class Tree extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cursor: {},
      color: '',
    }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (node, toggled) {
    if (this.state.cursor) {
      let oldCursor = this.state.cursor
      oldCursor.active = false
    }
    node.active = true
    if (node.children) {
      node.toggled = toggled
      if (node.toggled) {
        this.setState({color: 'white'})
      } else {
        this.setState({color: 'black'})
      }
    }
    this.setState({ cursor: node })
    this.props.handleFileSelect(node)
  }

  stylesheet = () => {
    return {
      tree: {
        ...styles.tree,
        base: {
          ...styles.tree.base,
          color: this.state.color,
        },
        node: {
          ...styles.tree.node,
          header: {
            ...styles.tree.node.header,
            base: {
              ...styles.tree.node.header.base,
              color: this.state.color,
            }
          }
        }
      }
    }
  }

  render () {
    console.log(this.state.color)
    return <Treebeard data={this.props.data || {}} onToggle={this.onToggle} style={styles}/>
  }
}

export default Tree

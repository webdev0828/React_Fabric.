import React from 'react'
import PropTypes from 'prop-types'

class Text extends React.Component {
  static propTypes = {
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
  }

  static defaultProps = {
    top: 0,
    left: 0,
    radius: 5,
    fill: 'red',
  }

  componentDidMount() {
    const text = new window.fabric.IText('sample text', {
      type: 'text',
    })
    this.props.canvas.add(text)
  }

  render() {
    return null
  }
}

export default Text

import React from 'react'
import { connect } from 'react-redux'

class Rect extends React.Component {
  componentDidMount() {
    const canvas_grid = this.props.canvas_grid
    const mat_type = this.props.mat_type
    const mat_color = this.props.mat_color
    let width = 0
    let height = 0

    switch (mat_type) {
      case 1:
        width = canvas_grid * 2
        height = canvas_grid
        break
      case 2:
        width = canvas_grid
        height = canvas_grid * 2
        break
      case 3:
        width = canvas_grid
        height = canvas_grid
        break
      default:
        break
    }

    const rect = new window.fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: height,
      fill: mat_color,
    })
    this.props.canvas.add(rect)
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    canvas_grid: state.canvas_grid,
    mat_color: state.mat_color,
    mat_type: state.mat_type,
  }
}

const RectConnect = connect(mapStateToProps)(Rect)

export default RectConnect

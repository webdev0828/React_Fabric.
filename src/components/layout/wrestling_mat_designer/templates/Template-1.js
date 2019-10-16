import React from 'react'
import { connect } from 'react-redux'

class Template_One extends React.Component {
  componentDidMount() {
    const canvas_grid = this.props.canvas_grid
    const current_mat_type = this.props.current_mat_type
    const current_mat_color = this.props.current_mat_color
    let width = 0
    let height = 0

    switch (current_mat_type) {
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
      fill: current_mat_color,
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
    current_mat_color: state.current_mat_color,
    current_mat_type: state.current_mat_type,
  }
}

const RectConnect = connect(mapStateToProps)(Rect)

export default RectConnect

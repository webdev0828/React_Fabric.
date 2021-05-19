import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Rect extends React.Component {
  componentDidMount() {
    const canvas_grid = this.props.canvas_grid
    const mat_type = this.props.mat_type
    const mat_color = this.props.mat_color
    const mat_top = this.props.mat_top
    const mat_left = this.props.mat_left
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

    const colors = {
      black: '#0d0000',
      blue: '#1a468c',
      red: '#b71234',
      gray: '#4d4f53',
      lightgreen: '#9db290',
      gold: '#dbaa00',
    }

    const rect = new window.fabric.Rect({
      left: Math.round(mat_left / canvas_grid) * canvas_grid,
      top: Math.round(mat_top / canvas_grid) * canvas_grid,
      width: width,
      height: height,
      fill: colors[mat_color],
    })

    rect['setControlVisible']('ml', false)
    rect['setControlVisible']('mb', false)
    rect['setControlVisible']('mr', false)
    rect['setControlVisible']('mt', false)
    rect['cornerSize'] = 6

    this.props.canvas.add(rect)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  updateCanvasState = () => {
    let tempConfig = this.props._config
    if (tempConfig.undoStatus === false && tempConfig.redoStatus === false) {
      let jsonData = this.props.canvas.toJSON()
      let canvasAsJson = JSON.stringify(jsonData)
      if (tempConfig.currentStateIndex < tempConfig.canvasState.length - 1) {
        let indexToBeInserted = tempConfig.currentStateIndex + 1
        tempConfig.canvasState[indexToBeInserted] = canvasAsJson

        let numberOfElementsToRetain = indexToBeInserted + 1
        tempConfig.canvasState = tempConfig.canvasState.splice(
          0,
          numberOfElementsToRetain,
        )
      } else {
        tempConfig.canvasState.push(canvasAsJson)
      }

      tempConfig.currentStateIndex = tempConfig.canvasState.length - 1

      if (
        tempConfig.currentStateIndex === tempConfig.canvasState.length - 1 &&
        tempConfig.currentStateIndex !== -1
      ) {
        tempConfig.redoButton = 'disabled'
      }
    }
    this.props.setCanvasConfig(tempConfig)
  }

  render() {
    return null
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
  }
}

const mapStateToProps = state => {
  return {
    _config: state._config,
    canvas_grid: state.canvas_grid,
    mat_color: state.mat_color,
    mat_type: state.mat_type,
    mat_top: state.mat_top,
    mat_left: state.mat_left,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig,
    },
    dispatch,
  )
}

const RectConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rect)

export default RectConnect

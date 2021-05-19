import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Circle7 extends React.Component {
  componentDidMount() {
    const outer_circle = new window.fabric.Circle({
      radius: 195,
      fill: '#1e4ca0',
      stroke: 'white',
      strokeWidth: 10,
      top: 0,
      left: 0,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    outer_circle['setControlVisible']('mtr', false)

    this.props.canvas.add(outer_circle)
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
    wrestling_config: state.wrestling_config,
    circle_type: state.circle_type,
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

const Circle7Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Circle7)

export default Circle7Connect

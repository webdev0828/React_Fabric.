import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Circle5 extends React.Component {
  componentDidMount() {
    const config = this.props.wrestling_config
    const width = 400
    const height = (400 / config.width) * config.height
    const circle_type = this.props.circle_type
    let type = ''
    // let outer_radius = 0
    // let inner_radius = 0
    if (config.file === 'oct24.png' || config.file === 'oct30.png') {
      let res = circle_type.split('-')
      type = res[1]
    } else {
      type = circle_type
    }

    const outer_circle = new window.fabric.Circle({
      radius: 130,
      fill: 'blue',
      stroke: '#ea7225',
      strokeWidth: 35,
      top: height / 2 - 130 - 15,
      left: width / 2 - 130 - 15,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    const inner_circle = new window.fabric.Circle({
      radius: 20,
      fill: 'blue',
      top: width / 2 - 20,
      left: height / 2 - 20,
      stroke: '#ea7225',
      strokeWidth: 4,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    outer_circle['setControlVisible']('mtr', false)
    inner_circle['setControlVisible']('mtr', false)

    this.props.canvas.add(outer_circle)
    this.props.canvas.add(inner_circle)
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

const Circle5Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Circle5)

export default Circle5Connect

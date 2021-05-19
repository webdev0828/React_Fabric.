import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Circle1 extends React.Component {
  componentDidMount() {
    const config = this.props.wrestling_config
    const width = 400
    const height = (400 / config.width) * config.height
    const circle_type = this.props.circle_type
    let type = ''
    let outer_radius = 0
    let inner_radius = 0
    if (config.file === 'oct24.png' || config.file === 'oct30.png') {
      let res = circle_type.split('-')
      type = res[1]
    } else {
      type = circle_type
    }

    switch (config.file) {
      case '42x42.png':
      case '42x40.png':
      case '42x38.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break

      case '40x40.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 40) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 40) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 40) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
        }
        break

      case '36x36.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 36) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 36) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 36) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
        }
        break

      case '30x30.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 30) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 30) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 30) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 30) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 30) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 30) * 10 - 10) / 2)
            break
        }
        break

      case 'oct30.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break

      default:
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break
    }

    const outer_circle = new window.fabric.Circle({
      radius: outer_radius,
      fill: 'blue',
      stroke: 'white',
      strokeWidth: 5,
      top: height / 2 - outer_radius - 5,
      left: width / 2 - outer_radius - 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    const inner_circle = new window.fabric.Circle({
      radius: inner_radius,
      fill: 'blue',
      top: height / 2 - inner_radius - 5,
      left: width / 2 - inner_radius - 5,
      stroke: 'white',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    let rect_left = width / 2 - 5
    let rect_top = height / 2 - 5

    const topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: '#521',
        stroke: '#521',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: '#200',
        stroke: '#200',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const group = new window.fabric.Group([
      topLine,
      leftLine,
      bottomLine,
      rightLine,
    ])

    outer_circle['setControlVisible']('mtr', false)
    inner_circle['setControlVisible']('mtr', false)
    group['setControlVisible']('mtr', false)

    this.props.canvas.add(outer_circle)
    this.props.canvas.add(inner_circle)
    this.props.canvas.add(group)
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

const Circle1Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Circle1)

export default Circle1Connect

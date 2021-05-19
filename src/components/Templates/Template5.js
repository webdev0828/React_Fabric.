import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// rgb(26, 70, 140)
class Template5 extends React.Component {
  state = {
    template: [
      {
        x: 0,
        y: 0,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 0,
        y: 2,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 0,
        y: 4,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 0,
        y: 6,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 1,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 1,
        y: 1,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 1,
        y: 2,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 1,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 2,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 1,
        y: 5,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 1,
        y: 6,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 1,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 3,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 3,
        y: 1,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 4,
        y: 1,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 3,
        y: 3,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 3,
        y: 4,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 3,
        y: 5,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 4,
        y: 5,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 3,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 5,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 5,
        y: 1,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 5,
        y: 2,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 5,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 6,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 5,
        y: 5,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 5,
        y: 6,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 5,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 7,
        y: 0,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 7,
        y: 2,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 7,
        y: 4,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 7,
        y: 6,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 8,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 8,
        y: 1,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 8,
        y: 2,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 8,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 9,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 8,
        y: 5,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 8,
        y: 6,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 8,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 10,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 10,
        y: 1,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 11,
        y: 1,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 10,
        y: 3,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 10,
        y: 4,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 10,
        y: 5,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 11,
        y: 5,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 10,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },

      {
        x: 12,
        y: 0,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 12,
        y: 1,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 12,
        y: 2,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 12,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 13,
        y: 3,
        width: 1,
        height: 2,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 12,
        y: 5,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 12,
        y: 6,
        width: 2,
        height: 1,
        color: 'rgb(26, 70, 140)',
      },
      {
        x: 12,
        y: 7,
        width: 2,
        height: 1,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 14,
        y: 0,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 14,
        y: 2,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 14,
        y: 4,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
      {
        x: 14,
        y: 6,
        width: 1,
        height: 2,
        color: 'rgb(219, 170, 0)',
      },
    ],
  }
  componentDidMount() {
    const canvas_grid = this.props.canvas_grid
    const template = this.state.template

    const rect_count = template.length
    for (let i = 0; i < rect_count; i++) {
      const rect_info = template[i]
      let width = canvas_grid * rect_info.width
      let height = canvas_grid * rect_info.height
      let top =
        Math.round(this.props.template_top / canvas_grid) * canvas_grid +
        rect_info.y * canvas_grid
      let left =
        Math.round(this.props.template_left / canvas_grid) * canvas_grid +
        rect_info.x * canvas_grid

      const rect = new window.fabric.Rect({
        left,
        top,
        width: width,
        height: height,
        fill: rect_info.color,
        hasControls: false,
        stroke: '#9aa1a2',
      })
      this.props.canvas.add(rect)
    }
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
    canvas: state.canvas,
    _config: state._config,
    canvas_grid: state.canvas_grid,
    template_top: state.template_top,
    template_left: state.template_left,
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

const Template5Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Template5)

export default Template5Connect

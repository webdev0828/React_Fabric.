import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Image extends React.Component {
  componentDidMount() {
    const image_url = this.props.image_url
    window.fabric.Image.fromURL(image_url, image => {
      image.scale(0.7)
      image.set({
        left: 0,
        top: 0,
        hoverCursor: 'default',
      })

      image['setControlVisible']('ml', false)
      image['setControlVisible']('mb', false)
      image['setControlVisible']('mr', false)
      image['setControlVisible']('mt', false)
      image['cornerSize'] = 6

      this.props.canvas.add(image)
      this.props.canvas.renderAll()
      this.updateCanvasState()
    })
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
    image_url: state.image_url,
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

const ImageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Image)

export default ImageConnect

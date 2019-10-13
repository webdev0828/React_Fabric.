import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 600,
    height: 400,
  }

  state = {
    canvas: null,
  }

  componentDidUpdate() {
    const load_design = this.props.load_design
    const saved_id = this.props.saved_id
    if (load_design) {
      axios
        .post('http://localhost:3001/load_design', { id: saved_id })
        .then(res => {
          let tempConfig = res.data
          this.state.canvas.loadFromJSON(
            tempConfig.canvasState[tempConfig.currentStateIndex],
            () => {
              this.state.canvas.renderAll()
            },
          )
          this.props.setCanvasConfig(tempConfig)
          this.props.setDisableLoad()
        })
    }
  }

  componentDidMount() {
    const canvas = new window.fabric.Canvas(this.c)
    this.setState({ canvas })

    canvas.on('object:selected', () => {})

    canvas.on('selection:cleared', () => {})

    canvas.on('object:added', () => {
      if (!this.props.load_design) this.updateCanvasState()
    })

    canvas.on('object:modified', () => {
      if (!this.props.load_design) this.updateCanvasState()
    })
  }

  updateCanvasState = () => {
    let tempConfig = this.props._config
    if (tempConfig.undoStatus === false && tempConfig.redoStatus === false) {
      let jsonData = this.state.canvas.toJSON()
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
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })
    const { width, height } = this.props
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.state.canvas && children}
      </Fragment>
    )
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
  }
}

const setDisableLoad = () => {
  return {
    type: 'DISABLE_DESIGN_LOAD',
  }
}

const mapStateToProps = state => {
  return {
    _config: state._config,
    load_design: state.load_design,
    saved_id: state.saved_id,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setCanvasConfig, setDisableLoad }, dispatch)
}

const DesignCanvasState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesignCanvas)

export default DesignCanvasState

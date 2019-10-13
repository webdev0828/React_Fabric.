import React from 'react'
import { Row, Col, Button, FormSelect } from 'shards-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

const TextOptionTool = props => {
  return (
    <>
      <Row>
        <Col md="3">
          <Row>
            <Col md="7" className="form-group">
              <FormSelect>
                <option>Roboto</option>
                <option>AAA</option>
                <option>BBB</option>
                <option>CCC</option>
              </FormSelect>
            </Col>
            <Col md="5" className="form-group">
              <FormSelect onChange={fontSize => console.log(fontSize)}>
                <option onClick={() => props.setFontSize(46)}>46px</option>
                <option onClick={() => props.setFontSize(44)}>44px</option>
                <option onClick={() => props.setFontSize(42)}>42px</option>
                <option onClick={() => props.setFontSize(40)}>40px</option>
                <option onClick={() => props.setFontSize(38)}>38px</option>
                <option onClick={() => props.setFontSize(36)}>36px</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="text-font-style">
            <Col md="7">
              <span
                id="bold"
                className="bold"
                onClick={e => props.setTextStyle(e)}
              >
                B
              </span>
              <span
                id="italic"
                className="italic"
                onClick={e => props.setTextStyle(e)}
              >
                I
              </span>
              <span
                id="underline"
                className="underline"
                onClick={e => props.setTextStyle(e)}
              >
                U
              </span>
              <span
                id="capital"
                className="capital"
                onClick={e => props.setTextStyle(e)}
              >
                A
              </span>
            </Col>
            <Col md="5">
              <span
                id="left"
                className="left"
                onClick={e => props.setTextStyle(e)}
              >
                A
              </span>
              <span
                id="center"
                className="center"
                onClick={e => props.setTextStyle(e)}
              >
                B
              </span>
              <span
                id="right"
                className="right"
                onClick={e => props.setTextStyle(e)}
              >
                C
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </>
  )
}

class Toolbar extends React.Component {
  setTextStyle = e => {
    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    const targetClsName = e.target.className
    const textStyleOption = e.target.id
    if (targetClsName.indexOf('active') > -1) {
      e.target.className = e.target.id
      switch (textStyleOption) {
        case 'bold':
          activeObject.set('fontWeight', 'normal')
          break
        case 'italic':
          activeObject.set('fontStyle', '')
          break
        case 'underline':
          break
        case 'capital':
          break
        case 'left':
          break
        case 'center':
          break
        case 'right':
          break
        default:
          break
      }
    } else {
      e.target.className = e.target.id + ' active'
      switch (textStyleOption) {
        case 'bold':
          activeObject.set('fontWeight', 'bold')
          break
        case 'italic':
          activeObject.set('fontStyle', 'italic')
          break
        case 'underline':
          break
        case 'capital':
          break
        case 'left':
          break
        case 'center':
          break
        case 'right':
          break
        default:
          break
      }
    }
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setFontSize = fontSize => {
    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('fontSize', fontSize)
    console.log(activeObject)
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

  new = () => {
    let text = new window.fabric.IText('Sample Text', {})
    this.props.addNewText(text)
  }

  undo = () => {
    let tempConfig = this.props._config
    if (tempConfig.undoFinishedStatus) {
      if (tempConfig.currentStateIndex === -1) {
        tempConfig.undoStatus = false
      } else {
        if (tempConfig.canvasState.length >= 1) {
          tempConfig.undoFinishedStatus = 0
          if (tempConfig.currentStateIndex !== 0) {
            tempConfig.undoStatus = true
            this.props.canvas.loadFromJSON(
              tempConfig.canvasState[tempConfig.currentStateIndex - 1],
              () => {
                this.props.canvas.renderAll()
                tempConfig.undoStatus = false
                tempConfig.currentStateIndex -= 1
                tempConfig.undoButton = 'remove disabled'
                if (
                  tempConfig.currentStateIndex !==
                  tempConfig.canvasState.length - 1
                ) {
                  tempConfig.redoButton = 'remove disabled'
                }
                tempConfig.undoFinishedStatus = 1
              },
            )
          } else if (tempConfig.currentStateIndex === 0) {
            this.props.canvas.clear()
            tempConfig.undoFinishedStatus = 1
            tempConfig.undoButton = 'disabled'
            tempConfig.redoButton = 'remove disabled'
            tempConfig.currentStateIndex -= 1
          }
        }
      }
    }

    this.props.setCanvasConfig(tempConfig)
  }

  redo = () => {
    let tempConfig = this.props._config
    if (tempConfig.redoFinishedStatus) {
      if (
        tempConfig.currentStateIndex === tempConfig.canvasState.length - 1 &&
        tempConfig.currentStateIndex !== -1
      ) {
        tempConfig.redoButton = 'disabled'
      } else {
        if (
          tempConfig.canvasState.length > tempConfig.currentStateIndex &&
          tempConfig.canvasState.length !== 0
        ) {
          tempConfig.redoFinishedStatus = 0
          tempConfig.redoStatus = true
          this.props.canvas.loadFromJSON(
            tempConfig.canvasState[tempConfig.currentStateIndex + 1],
            () => {
              this.props.canvas.renderAll()
              tempConfig.redoStatus = false
              tempConfig.currentStateIndex += 1
              if (tempConfig.currentStateIndex !== -1) {
                tempConfig.undoButton = 'remove disabled'
              }
              tempConfig.redoFinishedStatus = 1
              if (
                tempConfig.currentStateIndex ===
                  tempConfig.canvasState.length - 1 &&
                tempConfig.currentStateIndex !== -1
              ) {
                tempConfig.redoButton = 'disabled'
              }
            },
          )
        }
      }
    }

    this.props.setCanvasConfig(tempConfig)
  }

  save = () => {
    const data = {
      data: JSON.stringify(this.props._config),
    }
    axios.post('http://localhost:3001/save_design', data).then(res => {
      console.log(this.props._config)
    })
  }

  render() {
    return (
      <>
        <Row>
          <h3>Text Option</h3>
          <Button onClick={() => this.new()}>Add Text</Button>
          <Button onClick={() => this.undo()}>Undo</Button>
          <Button onClick={() => this.redo()}>Redo</Button>
          <Button onClick={() => this.save()}>Save</Button>
        </Row>
        <TextOptionTool setTextStyle={this.setTextStyle} />
      </>
    )
  }
}

const addNewText = text => {
  return {
    type: 'NEW_TEXT',
    component: text,
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
    components: [...state.components],
    _config: state._config,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addNewText, setCanvasConfig }, dispatch)
}

const ToobarPane = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar)

export default ToobarPane

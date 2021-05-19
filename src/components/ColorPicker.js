import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

var ctxB
var ctxS
var wB = 150
var hB = 150
var wS = 150
var hS = 30
var drag = false
var rgbColor = 'rgb(255,0,0)' // red

function colorBlockFill() {
  ctxB.rect(0, 0, wB, hB)
  gradientBlock()
}

function colorStripFill() {
  ctxS.rect(0, 0, wS, hS)
  var grd1 = ctxS.createLinearGradient(0, 0, wS, 0)
  grd1.addColorStop(0, 'rgb(255, 0, 0)') // red
  grd1.addColorStop(0.17, 'rgb(255, 255, 0)') // yellow
  grd1.addColorStop(0.34, 'rgb(0, 255, 0)') // green
  grd1.addColorStop(0.51, 'rgb(0, 255, 255)') // aqua
  grd1.addColorStop(0.68, 'rgb(0, 0, 255)') // blue
  grd1.addColorStop(0.85, 'rgb(255, 0, 255)') // magenta
  grd1.addColorStop(1, 'rgb(255, 0, 0)') // red
  ctxS.fillStyle = grd1
  ctxS.fill()
}

function gradientBlock() {
  ctxB.fillStyle = rgbColor
  ctxB.fillRect(0, 0, wB, hB)
  var grdWhite = ctxB.createLinearGradient(0, 0, wB, 0)
  grdWhite.addColorStop(0, 'rgb(255,255,255)')
  grdWhite.addColorStop(1, 'transparent')
  ctxB.fillStyle = grdWhite
  ctxB.fillRect(0, 0, wB, hB)
  var grdBlack = ctxB.createLinearGradient(0, 0, 0, hB)
  grdBlack.addColorStop(0, 'transparent')
  grdBlack.addColorStop(1, 'rgb(0,0,0)')
  ctxB.fillStyle = grdBlack
  ctxB.fillRect(0, 0, wB, hB)
}

class ColorPickerContainer extends React.Component {
  componentDidMount = () => {}
  state = {
    isPickerVisible: true,
    color: rgbColor,
  }

  togglePicker = () => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible })
  }

  clickStrip = e => {
    this.selectColor(ctxS, e, this)
    gradientBlock()
  }

  mouseDownBlock = e => {
    drag = true
    this.selectColor(ctxB, e, this)
  }

  mouseMoveBlock = e => {
    if (drag) {
      this.selectColor(ctxB, e, this)
    }
  }

  selectColor = (ctx, e, self) => {
    var x = e.nativeEvent.offsetX
    var y = e.nativeEvent.offsetY
    var imageData = ctx.getImageData(x, y, 1, 1).data
    rgbColor =
      'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')'
    self.setState({ color: rgbColor })

    const activeObject = this.props.canvas._activeObject
    if (!activeObject) return

    if (this.props.type === 'rect') {
      if (activeObject.__proto__.type === 'group') {
        switch (this.props.selectedGroupType) {
          case 0:
            activeObject._objects[0].set('stroke', rgbColor)
            activeObject._objects[2].set('stroke', rgbColor)
            $('.default-color-1').css('background', rgbColor)
            break
          case 1:
            activeObject._objects[1].set('stroke', rgbColor)
            $('.default-color-2').css('background', rgbColor)
            break
          case 2:
            activeObject._objects[3].set('stroke', rgbColor)
            $('.default-color-3').css('background', rgbColor)
            break
          default:
            break
        }
      } else if (activeObject.__proto__.type === 'path-group') {
        for (let i = 0; i < activeObject.paths.length; i++) {
          let index = this.props.artworkPaths[
            this.props.selectedGroupType
          ].indexOf(i)
          if (index >= 0) activeObject.paths[i].setFill(rgbColor)
        }
        $(
          `.artwork-color-pane .default-colors .default-color-${this.props
            .selectedGroupType + 1}`,
        ).css('background', rgbColor)
      } else {
        if (activeObject.get('fill') === 'rgba(0,0,0,0)') {
          activeObject.set('stroke', rgbColor)
          $('.circle-color-pane .default-color-2').css('background', rgbColor)
        } else {
          if (this.props.selectedGroupType === 0) {
            activeObject.set('fill', rgbColor)
            $('.circle-color-pane .default-color-1').css('background', rgbColor)
          } else if (this.props.selectedGroupType === 1) {
            activeObject.set('stroke', rgbColor)
            $('.circle-color-pane .default-color-2').css('background', rgbColor)
          }
        }
      }
    } else {
      if (this.props.textColorOption === 'fill') {
        activeObject.set('fill', rgbColor)
      } else {
        activeObject.set('stroke', rgbColor)
      }
    }
    this.props.canvas.renderAll()
    this.updateCanvasState()
    var rColor = imageData[0] / 1
    var gColor = imageData[1] / 1
    var bColor = imageData[2] / 1
    $('#rgb-selected-color').val(
      rColor.toString(16) + gColor.toString(16) + bColor.toString(16),
    )
  }

  mouseUpBlock = () => {
    drag = false
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
    return (
      <div>
        <ColorPicker
          isVisible={this.state.isPickerVisible}
          color={this.state.color}
          mouseDownBlock={this.mouseDownBlock}
          mouseMoveBlock={this.mouseMoveBlock}
          mouseUpBlock={this.mouseUpBlock}
          clickStrip={this.clickStrip}
        />
        <div className="row">
          <p
            className="col-md-8"
            style={{
              marginTop: '0px',
              borderBottom: 'none',
            }}
          >
            Color Code: #
          </p>
          <div className="col-md-3" style={{ paddingLeft: '0px' }}>
            <input type="text" id="rgb-selected-color"></input>
          </div>
        </div>
      </div>
    )
  }
}

class ColorPicker extends React.Component {
  state = {
    color: rgbColor,
  }

  componentDidMount = () => {
    var canvasB = this.refs.canvasBlock
    var canvasS = this.refs.canvasStrip
    ctxB = canvasB.getContext('2d')
    ctxS = canvasS.getContext('2d')
    colorBlockFill()
    colorStripFill()
  }

  render() {
    var styles = {
      opacity: this.props.isVisible ? '1' : '0',
    }
    return (
      <div id="color-picker" style={styles}>
        <canvas
          id="color-block"
          height={hB}
          width={wB}
          onMouseDown={this.props.mouseDownBlock}
          onMouseMove={this.props.mouseMoveBlock}
          onMouseUp={this.props.mouseUpBlock}
          ref="canvasBlock"
        ></canvas>
        <canvas
          id="color-strip"
          height={hS}
          width={wS}
          onClick={this.props.clickStrip}
          ref="canvasStrip"
        ></canvas>
      </div>
    )
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
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

const mapStateToProps = state => {
  return {
    _config: state._config,
    canvas: state.canvas,
    selectedGroupType: state.selectedGroupType,
    textColorOption: state.textColorOption,
    artworkPaths: state.artworkPaths,
  }
}

const ColorPickerContainerConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPickerContainer)

export default ColorPickerContainerConnect

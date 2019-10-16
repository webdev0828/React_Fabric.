import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import { Popover } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

class MatsToolbar extends React.Component {
  addNewRect = (type, color) => {
    const rect = new window.fabric.Rect({
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      type: 'rectangle',
      fill: '#fab',
    })

    const data = {
      mat_type: type,
      mat_color: color,
      component: rect,
    }
    this.props.addNewRect(data)
  }
  render() {
    return (
      <div id="mats" className="second-menu">
        <div className="adddiv">
          <h2>Mats</h2>
        </div>
        <div className="matlist_main">
          <ul className="matlistul">
            <li>
              <span className="mat-caption">Royal Blue</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/rb1.jpg')}
                  alt="Royal Blue"
                  onClick={() => this.addNewRect(1, 'blue')}
                />
                <img
                  src={require('./../../../assets/img/rb2.jpg')}
                  alt="Royal Blue"
                  onClick={() => this.addNewRect(2, 'blue')}
                />
                <img
                  src={require('./../../../assets/img/rb3.jpg')}
                  alt="Royal Blue"
                  onClick={() => this.addNewRect(3, 'blue')}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Red</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/red1.jpg')}
                  alt="RED"
                  onClick={() => this.addNewRect(1, 'red')}
                />
                <img
                  src={require('./../../../assets/img/red2.jpg')}
                  alt="RED"
                  onClick={() => this.addNewRect(2, 'red')}
                />
                <img
                  src={require('./../../../assets/img/red3.jpg')}
                  alt="RED"
                  onClick={() => this.addNewRect(3, 'red')}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Gold</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/gold1.jpg')}
                  alt="Gold"
                  onClick={() => this.addNewRect(1, 'gold')}
                />
                <img
                  src={require('./../../../assets/img/gold2.jpg')}
                  alt="Gold"
                  onClick={() => this.addNewRect(2, 'gold')}
                />
                <img
                  src={require('./../../../assets/img/gold3.jpg')}
                  alt="Gold"
                  onClick={() => this.addNewRect(3, 'gold')}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Black</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/black1.jpg')}
                  alt="Black"
                  onClick={() => this.addNewRect(1, 'black')}
                />
                <img
                  src={require('./../../../assets/img/black2.jpg')}
                  alt="Black"
                  onClick={() => this.addNewRect(2, 'black')}
                />
                <img
                  src={require('./../../../assets/img/black3.jpg')}
                  alt="Black"
                  onClick={() => this.addNewRect(3, 'black')}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Gray</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/grey1.jpg')}
                  alt="Grey"
                  onClick={() => this.addNewRect(1, 'gray')}
                />
                <img
                  src={require('./../../../assets/img/grey2.jpg')}
                  alt="Grey"
                  onClick={() => this.addNewRect(2, 'gray')}
                />
                <img
                  src={require('./../../../assets/img/grey3.jpg')}
                  alt="Grey"
                  onClick={() => this.addNewRect(3, 'gray')}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Light Green</span>
              <span className="mat-images">
                <img
                  src={require('./../../../assets/img/green.jpg')}
                  alt="Green"
                  onClick={() => this.addNewRect(1, 'lightgreen')}
                />
                <img
                  src={require('./../../../assets/img/green2.jpg')}
                  alt="Green"
                  onClick={() => this.addNewRect(2, 'lightgreen')}
                />
                <img
                  src={require('./../../../assets/img/green3.jpg')}
                  alt="Green"
                  onClick={() => this.addNewRect(3, 'lightgreen')}
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const addNewRect = data => {
  return {
    type: 'NEW_RECT',
    data: data,
  }
}

const mapStateToProps = state => {
  return {
    components: [...state.components],
    _config: state._config,
    canvas: state.canvas,
    templates: state.templates,
  }
}

const mapDispatchToPropsForRect = dispatch => {
  return bindActionCreators({ addNewRect }, dispatch)
}

const MatsToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect,
)(MatsToolbar)

class TemplatesToolbar extends React.Component {
  addNewTemplate = e => {
    const templates = this.props.templates
    console.log(templates[e.target.alt])
    console.log(e.target.alt)
  }
  render() {
    return (
      <div id="template" className="second-menu" style={{ display: 'none' }}>
        <div className="adddiv">
          <h2>Templates</h2>
        </div>
        <div className="templatesmain">
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template1.jpg')}
                alt="First_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template2.jpg')}
                alt="Second_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template3.jpg')}
                alt="Third_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template4.jpg')}
                alt="Forth_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template5.jpg')}
                alt="Fifth_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template6.jpg')}
                alt="Sixth_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require('./../../../assets/img/template7.jpg')}
                alt="Seventh_Template"
                onClick={this.addNewTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const TemplatesToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect,
)(TemplatesToolbar)

const TextStyle = props => {
  return (
    <>
      <div id="text-style" className="row">
        <div className="col-md-6 col-sm-12">
          <h1 id="text-style-1" onClick={props.setTextArcStyle}>
            Text1
          </h1>
        </div>
        <div className="col-md-6 col-sm-12">
          <h1 id="text-style-2" onClick={props.setTextArcStyle}>
            Text2
          </h1>
        </div>
      </div>
      <div id="text-style" className="row">
        <div className="col-md-6 col-sm-12">
          <h1 id="text-style-3" onClick={props.setTextArcStyle}>
            Text3
          </h1>
        </div>
        <div className="col-md-6 col-sm-12">
          <h1 id="text-style-4" onClick={props.setTextArcStyle}>
            Text4
          </h1>
        </div>
      </div>
    </>
  )
}

class TextToolbar extends React.Component {
  addNewText = () => {
    let text = new window.fabric.IText('Sample Text', {})
    this.props.addNewText(text)
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

  setTextStyle = id => {
    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    let targetClsName = $('#' + id).attr('class')
    const textStyleOption = id
    if (targetClsName.indexOf('active') > -1) {
      $('#' + id).removeClass('active')
      switch (textStyleOption) {
        case 'bold':
          activeObject.set('fontWeight', 'normal')
          break
        case 'italic':
          activeObject.set('fontStyle', '')
          break
        case 'underline':
          activeObject.set('textDecoration', '')
          break
        case 'capital':
          activeObject.text = activeObject.text.toLowerCase()
          break
        case 'left-align':
        case 'center-align':
        case 'right-align':
          activeObject.set('textAlign', 'left')
          break
        default:
          break
      }
    } else {
      $('#' + id).addClass('active')
      switch (textStyleOption) {
        case 'bold':
          activeObject.set('fontWeight', 'bold')
          break
        case 'italic':
          activeObject.set('fontStyle', 'italic')
          break
        case 'underline':
          activeObject.set('textDecoration', 'underline')
          break
        case 'capital':
          activeObject.text = activeObject.text.toUpperCase()
          break
        case 'left-align':
          activeObject.set('textAlign', 'left')
          $('#center-align').removeClass('active')
          $('#right-align').removeClass('active')
          break
        case 'center-align':
          activeObject.set('textAlign', 'center')
          $('#left-align').removeClass('active')
          $('#right-align').removeClass('active')
          break
        case 'right-align':
          activeObject.set('textAlign', 'right')
          $('#center-align').removeClass('active')
          $('#left-align').removeClass('active')
          break
        default:
          break
      }
    }
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setFontSize = e => {
    let { value } = e.target

    let fontSize = value.replace('px', '')

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('fontSize', fontSize)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setLineHeight = e => {
    let { value } = e.target
    $('#line_ht_get').val(value)
    $('#line_ht_set').val(value)

    $('#line_ht_get').css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value *
        10}%, #fff ${value * 10}%, #fff 100%)`,
    })

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('lineHeight', value)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  bindTextColorBtn = () => {
    $('#text-color').click()
  }

  setTextColor = e => {
    let { value } = e.target
    $('#text-color-bind').css({ background: value })

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('fill', value)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setOutlineSize = e => {
    let { value } = e.target

    $('#size_get').val(value)
    $('#size_set').val(value)

    $('#size_get').css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value *
        10}%, #fff ${value * 10}%, #fff 100%)`,
    })

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('strokeWidth', value)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  bindOutlineColorBtn = () => {
    $('#outline-color').click()
  }

  setOutlineColor = e => {
    let { value } = e.target
    $('#outline-color-bind').css({ background: value })

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    activeObject.set('stroke', value)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setTextArcStyle = e => {
    let text_arc_style = e.target.id

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    console.log(activeObject)

    switch (text_arc_style) {
      case 'text-style-1':
        break
      case 'text-style-2':
        break
      case 'text-style-3':
        break
      case 'text-style-4':
        break
      default:
        break
    }
  }

  setLetterSpace = e => {
    let { value } = e.target
    $('#spacing_get').val(value)
    $('#spacing_set').val(value)

    $('#spacing_get').css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value}%, #fff ${value}%, #fff 100%)`,
    })

    let activeObject = this.props.canvas._activeObject
    if (activeObject == null) return

    // activeObject.set('charSpacing', value)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  render() {
    return (
      <div id="text" className="second-menu" style={{ display: 'none' }}>
        <div className="adddiv">
          <h2>Add Logo</h2>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row row-border-btm">
                <div className="col-md-8 vrtcl-dot-line">
                  <div className="form-group">
                    <select className="form-control slct-font-fam">
                      <option>Roboto</option>
                      <option>Oswald</option>
                      <option>Ralway</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <select
                      className="form-control slct-font-size"
                      onChange={this.setFontSize}
                    >
                      <option val="40">40px</option>
                      <option val="42">42px</option>
                      <option val="44">44px</option>
                      <option val="46">46px</option>
                      <option val="48">48px</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row row-border-btm pt-15 pb-15">
                <div className="col-md-7 vrtcl-dot-line">
                  <div className="font-stl-blk">
                    <button
                      id="bold"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('bold')}
                    >
                      B
                    </button>
                    <button
                      id="italic"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('italic')}
                    >
                      <i>I</i>
                    </button>
                    <button
                      id="underline"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('underline')}
                    >
                      <span>U</span>
                    </button>
                    <button
                      id="capital"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('capital')}
                    >
                      AA
                    </button>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="font-stl-blk">
                    <button
                      id="left-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('left-align')}
                    ></button>
                    <button
                      id="center-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('center-align')}
                    ></button>
                    <button
                      id="right-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle('right-align')}
                    ></button>
                  </div>
                </div>
              </div>
              <div className="row pt-15 pb-15">
                <div className="col-md-12">
                  <div className="line-height-blk">
                    <div className="line-height-label">
                      <span>Line height</span>
                    </div>
                    <div className="line-height-label">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="1"
                          className="range-slider"
                          id="line_ht_get"
                          onChange={this.setLineHeight}
                        ></input>
                      </div>
                    </div>
                    <div className="line-height-value">
                      <input
                        type="number"
                        id="line_ht_set"
                        className="btn ln-ht-val-btn"
                        defaultValue="1"
                        min="1"
                        max="10"
                        onChange={this.setLineHeight}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="spacing-blk pt-10">
                    <div className="spacing-label">
                      <span>Spacing</span>
                    </div>
                    <div className="spacing-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="24"
                          className="range-slider"
                          id="spacing_get"
                          onChange={this.setLetterSpace}
                        ></input>
                      </div>
                    </div>
                    <div className="spacing-value">
                      <input
                        type="number"
                        id="spacing_set"
                        min="1"
                        max="100"
                        className="btn spacing-val-btn"
                        defaultValue="24"
                        onChange={this.setLetterSpace}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="choose-clr-blk pt-10">
                    <div className="choos-clr-label">
                      <span>Choose Color</span>
                    </div>
                    <div className="choos-clr-btn">
                      <button
                        id="text-color-bind"
                        className="btn"
                        onClick={() => this.bindTextColorBtn()}
                      ></button>
                      <input
                        type="color"
                        id="text-color"
                        className="btn"
                        defaultValue="black"
                        onChange={this.setTextColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="outline-blk pt-15">
            <h2>ADD OUTLINE</h2>
          </div>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row">
                <div className="col-md-12">
                  <div className="size-blk pt-10">
                    <div className="size-label">
                      <span>Size</span>
                    </div>
                    <div className="size-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="1"
                          className="range-slider"
                          id="size_get"
                          onChange={this.setOutlineSize}
                        ></input>
                      </div>
                    </div>
                    <div className="size-value">
                      <input
                        type="number"
                        id="size_set"
                        className="btn size-val-btn"
                        min="1"
                        max="10"
                        defaultValue="1"
                        onChange={this.setOutlineSize}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="choose-clr-blk pt-10">
                    <div className="choos-clr-label">
                      <span>Choose Color</span>
                    </div>
                    <div className="choos-clr-btn">
                      <button
                        id="outline-color-bind"
                        className="btn"
                        onClick={() => this.bindOutlineColorBtn()}
                      ></button>
                      <input
                        type="color"
                        id="outline-color"
                        className="btn"
                        onChange={this.setOutlineColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-blk">
            <h2>ADD SHAPE</h2>
          </div>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row">
                <div className="col-md-12">
                  <div className="font-stl-blk pt-10">
                    <div className="choos-clr-label float-left">
                      <span>Font Style</span>
                    </div>
                    <div className="choose-button-blk float-right">
                      <Popover
                        placement="right"
                        content={
                          <TextStyle setTextArcStyle={this.setTextArcStyle} />
                        }
                        trigger="click"
                      >
                        <button className="btn choose-btn">CHOOSE </button>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="arc-blk pt-10">
                    <div className="arc-label">
                      <span>Arc</span>
                    </div>
                    <div className="arc-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="50"
                          className="range-slider"
                          id="arc_get"
                        />
                      </div>
                    </div>
                    <div className="arc-value">
                      <input
                        type="number"
                        id="arc_set"
                        className="btn size-val-btn"
                        defaultValue="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn green-btn" onClick={() => this.addNewText()}>
            Add Text
          </button>
        </div>
      </div>
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

const mapDispatchToPropsForText = dispatch => {
  return bindActionCreators({ addNewText, setCanvasConfig }, dispatch)
}

const TextToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForText,
)(TextToolbar)

class LogoToolbar extends React.Component {
  state = {
    files: '',
  }

  bindFileExplorer = () => {
    $('#customFile').click()
  }

  onChangeHandler = e => {
    this.setState({ files: e.target.files })

    let formData = new FormData()
    formData.append('files', this.state)

    axios
      .post('/upload_images', formData)
      .then(res => {})
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div id="logo" className="second-menu" style={{ display: 'none' }}>
        <div className="adddiv">
          <h2>Add Logo</h2>
          <p onClick={() => this.bindFileExplorer()}>
            Upload your own images from computer
          </p>
          <input
            type="file"
            multiple
            className="custom-file-input"
            id="customFile"
            name="files"
            onChange={this.onChangeHandler}
          />
          <small>
            <i>Accepted Files : SVG, JPG, JPEG, PNG</i>
          </small>
        </div>
      </div>
    )
  }
}

class SidebarItems extends React.Component {
  render() {
    return (
      <>
        <MatsToolbarConnect />
        <TemplatesToolbarConnect />
        <TextToolbarConnect />
        <LogoToolbar />
      </>
    )
  }
}

export default SidebarItems

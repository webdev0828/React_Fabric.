import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

class MatsToolbar extends React.Component {
  setActiveTab = id => {
    $('.flexi-colors div.active').removeClass('active')
    $(`.${id}-color`).addClass('active')
    $('.smooth-colors').css('display', 'none')
    $('.tatami-colors').css('display', 'none')
    $('.carpet-colors').css('display', 'none')
    $(`.${id}-colors`).css('display', 'block')
  }
  setSmoothBackgroundColor = index => {
    this.props.setFlexiSmoothIndex(index)
    let objects = this.props.canvas.getObjects()

    for (let i = 1; i < 5; i++) {
      objects[i].set('visible', true)
      objects[i].setGradient('fill', {
        type: 'linear',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: objects[i].height,
        colorStops: {
          0: this.props.flexi_smooth_colors[index][0],
          0.5: this.props.flexi_smooth_colors[index][1],
          1: this.props.flexi_smooth_colors[index][1],
        },
      })
    }

    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setRoseWoodBackground = () => {
    let objects = this.props.canvas.getObjects()
    for (let i = 0; i < 5; i++) {
      objects[i].set('visible', false)
    }
    window.fabric.Image.fromURL(
      require('./../../../../assets/img/rosewood.png'),
      image => {
        this.props.canvas.setBackgroundImage(
          image,
          this.props.canvas.renderAll.bind(this.props.canvas),
          {
            top: 0,
            left: 0,
            width: 400,
            height: 480,
          },
        )
      },
    )
    this.props.canvas.renderAll()
  }

  setSandalWoodBackground = () => {
    let objects = this.props.canvas.getObjects()
    for (let i = 0; i < 5; i++) {
      objects[i].set('visible', false)
    }
    window.fabric.Image.fromURL(
      require('./../../../../assets/img/sandalwood.png'),
      image => {
        this.props.canvas.setBackgroundImage(
          image,
          this.props.canvas.renderAll.bind(this.props.canvas),
          {
            top: 0,
            left: 0,
            width: 400,
            height: 480,
          },
        )
      },
    )
    this.props.canvas.renderAll()
  }

  setTatamiBackgroundColor = index => {
    this.props.setFlexiTatamiIndex(index)
    let objects = this.props.canvas.getObjects()
    for (let i = 1; i < 5; i++) {
      objects[i].setGradient('fill', {
        type: 'linear',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: objects[i].height,
        colorStops: {
          0: this.props.flexi_tatami_colors[index][0],
          0.5: this.props.flexi_tatami_colors[index][1],
          1: this.props.flexi_tatami_colors[index][0],
        },
      })
    }

    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  setCarpetBackgroundColor = index => {
    this.props.setFlexiSmoothIndex(index)
    let objects = this.props.canvas.getObjects()

    for (let i = 1; i < 5; i++) {
      objects[i].set('visible', true)
      objects[i].setGradient('fill', {
        type: 'linear',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: objects[i].height,
        colorStops: {
          0: this.props.flexi_carpet_colors[index][0],
          0.5: this.props.flexi_carpet_colors[index][1],
          1: this.props.flexi_carpet_colors[index][1],
        },
      })
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
    return (
      <>
        <div className="adddiv">
          <h2>Mats</h2>
        </div>
        <div className="matlist_main">
          <div className="col-md-12 mt-15">
            <div className="col-md-1"></div>
            <div className="col-md-10 flexi-colors">
              <div
                className="col-md-4 smooth-color active"
                data-target="smooth"
                onClick={() => this.setActiveTab('smooth')}
              >
                <span onClick={() => this.setActiveTab('smooth')}>SMOOTH</span>
              </div>
              <div
                className="col-md-4 tatami-color"
                data-target="tatami"
                onClick={() => this.setActiveTab('tatami')}
              >
                <span onClick={() => this.setActiveTab('tatami')}>TATAMI</span>
              </div>
              <div
                className="col-md-4 carpet-color"
                data-target="carpet"
                onClick={() => this.setActiveTab('carpet')}
              >
                <span onClick={() => this.setActiveTab('carpet')}>CARPET</span>
              </div>
              <div className="smooth-colors">
                <div
                  className="preset-color-row row"
                  style={{ paddingTop: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(0)}
                    style={{ background: '#ffffff' }}
                  >
                    <span className="tooltiptext">White</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(1)}
                    style={{ background: '#c4c8c9' }}
                  >
                    <span className="tooltiptext">Light Gray</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(2)}
                    style={{ background: '#d8a901' }}
                  >
                    <span className="tooltiptext">Athletic Gold</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(3)}
                    style={{ background: '#ff7900' }}
                  >
                    <span className="tooltiptext">Orange</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(4)}
                    style={{ background: '#b71234' }}
                  >
                    <span className="tooltiptext">Red</span>
                  </div>
                </div>
                <div className="preset-color-row row">
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(5)}
                    style={{ background: '#284e35' }}
                  >
                    <span className="tooltiptext">Dark Green</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(6)}
                    style={{ background: '#7d2349' }}
                  >
                    <span className="tooltiptext">Maroon</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(7)}
                    style={{ background: '#522d24' }}
                  >
                    <span className="tooltiptext">Brown</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(8)}
                    style={{ background: '#0e0000' }}
                  >
                    <span className="tooltiptext">Black</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(9)}
                    style={{ background: '#4c306b' }}
                  >
                    <span className="tooltiptext">Purple</span>
                  </div>
                </div>
                <div
                  className="preset-color-row row"
                  style={{ paddingBottom: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(10)}
                    style={{ background: '#4e4f53' }}
                  >
                    <span className="tooltiptext">Charcoal Gray</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(11)}
                    style={{ background: '#263e6a' }}
                  >
                    <span className="tooltiptext">Navy</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setSmoothBackgroundColor(12)}
                    style={{ background: '#0146ad' }}
                  >
                    <span className="tooltiptext">Royal Blue</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 rosewood tooltip"
                    onClick={() => this.setRoseWoodBackground()}
                  >
                    <span className="tooltiptext">Rose Wood</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 sandalwood tooltip"
                    onClick={() => this.setSandalWoodBackground()}
                  >
                    <span className="tooltiptext">Sand Wood</span>
                  </div>
                </div>
              </div>
              <div className="tatami-colors">
                <div
                  className="preset-color-row row"
                  style={{ paddingTop: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(0)}
                    style={{ background: '#003da7' }}
                  >
                    <span className="tooltiptext">Royal Blue</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(1)}
                    style={{ background: '#c20430' }}
                  >
                    <span className="tooltiptext">Red</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(2)}
                    style={{ background: '#daaa00' }}
                  >
                    <span className="tooltiptext">Gold</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(3)}
                    style={{ background: '#0e0000' }}
                  >
                    <span className="tooltiptext">Black</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(4)}
                    style={{ background: '#9db291' }}
                  >
                    <span className="tooltiptext">Light Green</span>
                  </div>
                </div>
                <div
                  className="preset-color-row row"
                  style={{ paddingBottom: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(5)}
                    style={{ background: '#ffffff' }}
                  >
                    <span className="tooltiptext">White</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setTatamiBackgroundColor(6)}
                    style={{ background: '#4e4f53' }}
                  >
                    <span className="tooltiptext">Charcoal Grey</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    style={{ visibility: 'hidden' }}
                  >
                    {' '}
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    style={{ visibility: 'hidden' }}
                  >
                    {' '}
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    style={{ visibility: 'hidden' }}
                  >
                    {' '}
                  </div>
                </div>
              </div>
              <div className="carpet-colors">
                <div
                  className="preset-color-row row"
                  style={{ paddingTop: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(0)}
                    style={{ background: '#b71234' }}
                  >
                    <span className="tooltiptext">Red</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(1)}
                    style={{ background: '#263f6a' }}
                  >
                    <span className="tooltiptext">Navy</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(2)}
                    style={{ background: '#4b306a' }}
                  >
                    <span className="tooltiptext">Purple</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(3)}
                    style={{ background: '#006643' }}
                  >
                    <span className="tooltiptext">Green</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(4)}
                    style={{ background: '#c3c8c8' }}
                  >
                    <span className="tooltiptext">Light Green</span>
                  </div>
                </div>
                <div
                  className="preset-color-row row"
                  style={{ paddingBottom: '8px' }}
                >
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(5)}
                    style={{ background: '#4d4f53' }}
                  >
                    <span className="tooltiptext">Charcoal Grey</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(6)}
                    style={{ background: '#0d0000' }}
                  >
                    <span className="tooltiptext">Black</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(7)}
                    style={{ background: '#68003A' }}
                  >
                    <span className="tooltiptext">Maroon</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    onClick={() => this.setCarpetBackgroundColor(8)}
                    style={{ background: '#008b95' }}
                  >
                    <span className="tooltiptext">Teal</span>
                  </div>
                  <div
                    className="pre-clr-box clr-pr1 tooltip"
                    style={{ visibility: 'hidden' }}
                  >
                    {' '}
                  </div>
                </div>
              </div>
              <div className="foam-thickness col-md-12">
                <div
                  className="thickness col-md-12"
                  style={{
                    background: '#2a3f54',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '15px',
                  }}
                >
                  <span
                    className="col-md-6"
                    style={{
                      color: 'white',
                      float: 'left',
                      paddingLeft: '0px',
                      paddingTop: '10px',
                      textAlign: 'left',
                    }}
                  >
                    Foam Thickness
                  </span>
                  <select
                    className="form-control slct-font-fam"
                    onChange={this.setFontFamily}
                    style={{ width: '30%', float: ' right' }}
                  >
                    <option>1"</option>
                    <option>1 1/4"</option>
                    <option>1 1/2"</option>
                    <option>1 5/8"</option>
                    <option>2"</option>
                  </select>
                </div>
              </div>
              <div className="mats-style">
                <span className="col-md-12">MATS STYLE</span>
                <div className="flexi-connect col-md-12">
                  <span className="col-md-6 ">FLEXI-Connect</span>
                  <input type="checkbox" />
                </div>
                <div className="flexi-roll-mats col-md-12">
                  <span className="col-md-6">FLEXI-Roll Mats</span>
                  <input type="checkbox" />
                </div>
                <div className="non-flexi-roll-mats col-md-12">
                  <span className="col-md-6">Non-FLEXI-Roll Mats</span>
                  <input type="checkbox" className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const setWrestlingConfig = (width, height, isNewMaterial) => {
  const data = {
    width: width,
    height: height,
    length_unit: 'METER',
    isNewMaterial: isNewMaterial,
  }
  return {
    type: 'SET_WRESTLING_CONFIG',
    _config: data,
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
  }
}

const setComponentType = type => {
  return {
    type: 'SET_COMPONENT_TYPE',
    component_type: type,
  }
}

const setFlexiSmoothIndex = index => {
  return {
    type: 'SET_FLEXI_SMOOTH_COLOR_INDEX',
    index: index,
  }
}

const setFlexiTatamiIndex = index => {
  return {
    type: 'SET_FLEXI_TATAMI_COLOR_INDEX',
    index: index,
  }
}

const setFlexiCarpetIndex = index => {
  return {
    type: 'SET_FLEXI_CARPET_COLOR_INDEX',
    index: index,
  }
}

const setMaterialChanged = changed => {
  return {
    type: 'SET_FLEXI_MATERIAL_CHANGED',
    changed: changed,
  }
}

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    flexi_smooth_colors: state.flexi_smooth_colors,
    flexi_tatami_colors: state.flexi_tatami_colors,
    flexi_carpet_colors: state.flexi_carpet_colors,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setWrestlingConfig,
      setComponentType,
      setFlexiSmoothIndex,
      setFlexiTatamiIndex,
      setFlexiCarpetIndex,
      setCanvasConfig,
      setMaterialChanged,
    },
    dispatch,
  )
}

const MatsToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatsToolbar)

class MatsToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById('mySidenav1').style.width = '0'
  }

  render() {
    return (
      <>
        <div id="mats" className="h100 second-menu fordeskview">
          <MatsToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav1 formobview wo"
          id="mySidenav1"
        >
          <a
            style={{ color: '#fff' }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <MatsToolbarConnect />
        </div>
      </>
    )
  }
}

export default MatsToolSidebar

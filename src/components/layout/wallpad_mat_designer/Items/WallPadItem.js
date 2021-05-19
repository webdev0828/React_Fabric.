import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

class WallPadToolbar extends React.Component {
  setWallPadColor = color => {
    this.props.canvas.backgroundColor = color
    this.props.canvas.renderAll()
  }

  setWallPad = e => {
    const { value } = e.target
    const index = value - 1
    $('.wallpad_0').css('display', 'none')
    $('.wallpad_1').css('display', 'none')
    $('.wallpad_2').css('display', 'none')
    $('.wallpad_3').css('display', 'none')
    $('.wallpad_0')
      .closest('div.canvas-container')
      .css('display', 'none')
    $('.wallpad_1')
      .closest('div.canvas-container')
      .css('display', 'none')
    $('.wallpad_2')
      .closest('div.canvas-container')
      .css('display', 'none')
    $('.wallpad_3')
      .closest('div.canvas-container')
      .css('display', 'none')

    $(`.wallpad_${index}`)
      .closest('div.canvas-container')
      .css('display', 'block')
    $(`.wallpad_${index}`).css('display', 'block')

    this.props.setCurrentWallPad(index)
    this.props.canvas.discardActiveObject()
  }
  render() {
    const wallpad_configs = this.props.wallpad_config['config']
    return (
      <>
        <div className="adddiv">
          <h2>Wall Pads</h2>
        </div>
        <div className="templatesmain mat-lft-blk-menu">
          <div className="col-md-12 mt-15 pb-15">
            <div className="row row-border-btm">
              <div className="col-md-6 vrtcl-dot-line">
                <div className="choos-clr-label">
                  <span>WALL Pad</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <select
                    className="form-control slct-font-size"
                    onChange={this.setWallPad}
                  >
                    {wallpad_configs.map((config, index) => (
                      <option key={index}>{index + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row row-border-btm">
              <span style={{ color: 'white', fontStyle: 'italic' }}>
                Select Color
              </span>
              <div className="preset-color-row">
                <div
                  className="pre-clr-box clr-pr1 tooltip"
                  style={{ backgroundColor: '#003a91' }}
                  onClick={() => this.setWallPadColor('#003a91')}
                >
                  <span className="tooltiptext">Royal Blue</span>
                </div>
                <div
                  className="pre-clr-box clr-pr2 tooltip"
                  style={{ backgroundColor: '#b71234' }}
                  onClick={() => this.setWallPadColor('#b71234')}
                >
                  <span className="tooltiptext">Red</span>
                </div>
                <div
                  className="pre-clr-box clr-pr3 tooltip"
                  style={{ backgroundColor: '#d7a900' }}
                  onClick={() => this.setWallPadColor('#d7a900')}
                >
                  <span className="tooltiptext">Gold</span>
                </div>
                <div
                  className="pre-clr-box clr-pr4 tooltip"
                  style={{ backgroundColor: '#0d0000' }}
                  onClick={() => this.setWallPadColor('#0d0000')}
                >
                  <span className="tooltiptext">Black</span>
                </div>
                <div
                  className="pre-clr-box clr-pr11 tooltip"
                  style={{ backgroundColor: '#006B36' }}
                  onClick={() => this.setWallPadColor('#006B36')}
                >
                  <span className="tooltiptext">Green</span>
                </div>
              </div>
              <div className="preset-color-row">
                <div
                  className="pre-clr-box clr-pr5 tooltip"
                  style={{ backgroundColor: '#4b2f6a' }}
                  onClick={() => this.setWallPadColor('#4b2f6a')}
                >
                  <span className="tooltiptext">Purple</span>
                </div>
                <div
                  className="pre-clr-box clr-pr6 tooltip"
                  style={{ backgroundColor: '#ff7900' }}
                  onClick={() => this.setWallPadColor('#ff7900')}
                >
                  <span className="tooltiptext">Orange</span>
                </div>
                <div
                  className="pre-clr-box clr-pr7 tooltip"
                  style={{ backgroundColor: '#284e37' }}
                  onClick={() => this.setWallPadColor('#284e37')}
                >
                  <span className="tooltiptext">Dark Green</span>
                </div>
                <div
                  className="pre-clr-box clr-pr8 tooltip"
                  style={{ backgroundColor: '#c4c8c9' }}
                  onClick={() => this.setWallPadColor('#c4c8c9')}
                >
                  <span className="tooltiptext">Light Grey</span>
                </div>
                <div
                  className="pre-clr-box clr-pr1 tooltip"
                  style={{ backgroundColor: '#01325a' }}
                  onClick={() => this.setWallPadColor('#01325a')}
                >
                  <span className="tooltiptext">Navy</span>
                </div>
              </div>
              <div className="preset-color-row">
                <div
                  className="pre-clr-box clr-pr9 tooltip"
                  style={{ backgroundColor: '#ffffff' }}
                  onClick={() => this.setWallPadColor('#ffffff')}
                >
                  <span className="tooltiptext">White</span>
                </div>
                <div
                  className="pre-clr-box clr-pr10 tooltip"
                  style={{ backgroundColor: '#532c25' }}
                  onClick={() => this.setWallPadColor('#532c25')}
                >
                  <span className="tooltiptext">Brown</span>
                </div>
                <div
                  className="pre-clr-box clr-pr11 tooltip"
                  style={{ backgroundColor: '#4e4f53' }}
                  onClick={() => this.setWallPadColor('#4e4f53')}
                >
                  <span className="tooltiptext">Charcoal Grey</span>
                </div>
                <div
                  className="pre-clr-box clr-pr12 tooltip"
                  style={{ backgroundColor: '#7b2349' }}
                  onClick={() => this.setWallPadColor('#7b2349')}
                >
                  <span className="tooltiptext">Maroon</span>
                </div>
                <div
                  className="pre-clr-box clr-pr6 tooltip"
                  style={{ backgroundColor: '#7baed4' }}
                  onClick={() => this.setWallPadColor('#7baed4')}
                >
                  <span className="tooltiptext">Carolina Blue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const setCurrentWallPad = index => {
  return {
    type: 'SET_CURRENT_WALLPAD',
    index,
  }
}

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    wallpad_config: state.wallpad_config,
  }
}

const mapDispatchToPropsForRect = dispatch => {
  return bindActionCreators({ setCurrentWallPad }, dispatch)
}

const WallPadToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect,
)(WallPadToolbar)

class WallPadToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById('mySidenav2').style.width = '0'
  }

  render() {
    return (
      <>
        <div id="wallpad" className="h100 second-menu fordeskview">
          <WallPadToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav2 formobview wo"
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
          <WallPadToolbarConnect />
        </div>
      </>
    )
  }
}

export default WallPadToolSidebar

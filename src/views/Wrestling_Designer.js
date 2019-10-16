import React from 'react'
import { Container } from 'shards-react'
import 'fabric-webpack'
import DesignCanvas from '../components/DesignCanvas'
import { connect } from 'react-redux'
import Text from '../components/Text'
import Rect from '../components/Rect'
import { bindActionCreators } from 'redux'
import OptionSettingDialogue from '../components/layout/wrestling_mat_designer/Option_Settting_Dialogue'
import Sidebar from '../components/layout/wrestling_mat_designer/Sidebar'
import Toolbar from '../components/layout/wrestling_mat_designer/Toolbar'
import ExtraMenu from '../components/layout/wrestling_mat_designer/ExtraMenu'
import SidebarItems from '../components/layout/wrestling_mat_designer/SidebarItems'
import $ from 'jquery'

class Dashboard extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id !== undefined) {
      this.props.setSaveDesignID(id)
    }

    $('.material-color-pane').css({ visibility: 'hidden' })
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

  showEditArtWorkDialogue = () => {
    $('.material-color-pane').css({ visibility: 'hidden' })
  }

  setArtWorkColor = color => {
    let activeObject = this.props.canvas._activeObject
    activeObject.set('fill', color)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  deleteSelectedMaterial = () => {
    let activeObject = this.props.canvas._activeObject
    if (activeObject) {
      this.props.canvas.remove(activeObject)
    }
    this.updateCanvasState()
  }

  reStoreSelectedMaterial = () => {
    let activeObject = this.props.canvas._activeObject
    activeObject.set('fill', this.props.selectedMaterialColor)
    this.props.canvas.renderAll()
    this.updateCanvasState()
  }

  clearCanvas = e => {
    e.preventDefault()
    this.props.canvas.clear()
    this.updateCanvasState()
  }

  render() {
    const components = this.props.components
    const wrestling_config = this.props.wrestling_config
    if (!wrestling_config.option_setting) return <OptionSettingDialogue />

    return (
      <>
        <Sidebar />
        <div id="content">
          <div className="outer">
            <div className="inner bg-light lter">
              <ExtraMenu />
              <div className="row ml0 mar">
                <div className="col-md-3 col-sm-12 text-center h100 pad0 mtopneg">
                  <SidebarItems />
                </div>
                <div className="col-md-8 col-sm-12 text-center pad0 main-content">
                  <div className="row main-edit-content">
                    {/* <div className="col-md-2">
                      <div className="row material-color-pane">
                        <img
                          className="cross-icon"
                          src={require('./../assets/img/cross.png')}
                          onClick={() => this.showEditArtWorkDialogue()}
                        ></img>
                        <p className="col-md-12">EDIT ARTWORK</p>
                        <span className="col-md-12">Choose Color</span>
                        <div
                          className="col-md-3 blue"
                          style={{ backgroundColor: 'royalblue' }}
                          onClick={() => this.setArtWorkColor('royalblue')}
                        ></div>
                        <div
                          className="col-md-3 red"
                          style={{ backgroundColor: 'red' }}
                          onClick={() => this.setArtWorkColor('red')}
                        ></div>
                        <div
                          className="col-md-3 gold"
                          style={{ backgroundColor: 'gold' }}
                          onClick={() => this.setArtWorkColor('gold')}
                        ></div>
                        <div
                          className="col-md-3 black"
                          style={{ backgroundColor: 'black' }}
                          onClick={() => this.setArtWorkColor('black')}
                        ></div>
                        <div
                          className="col-md-3 gray"
                          style={{ backgroundColor: 'gray' }}
                          onClick={() => this.setArtWorkColor('gray')}
                        ></div>
                        <div
                          className="col-md-3 lightgreen"
                          style={{ backgroundColor: 'lightgreen' }}
                          onClick={() => this.setArtWorkColor('lightgreen')}
                        ></div>

                        <button
                          className="btn col-md-5 redo"
                          onClick={() => this.reStoreSelectedMaterial()}
                        >
                          <img src={require('./../assets/img/redo.png')}></img>
                        </button>
                        <button
                          className="btn col-md-5 delete"
                          onClick={() => this.deleteSelectedMaterial()}
                        >
                          <img src={require('./../assets/img/del.png')}></img>
                        </button>
                      </div>
                    </div> */}
                    {/* <div className="col-md-10"> */}
                    <div className="addcontdiv">
                      <div className="inneraddcontdiv">
                        <div className="col-md-3">
                          <div className="row material-color-pane">
                            <img
                              className="cross-icon"
                              src={require('./../assets/img/cross.png')}
                              onClick={() => this.showEditArtWorkDialogue()}
                            ></img>
                            <p className="col-md-12">EDIT ARTWORK</p>
                            <span className="col-md-12">Choose Color</span>
                            <div
                              className="col-md-3 blue"
                              style={{ backgroundColor: 'royalblue' }}
                              onClick={() => this.setArtWorkColor('royalblue')}
                            ></div>
                            <div
                              className="col-md-3 red"
                              style={{ backgroundColor: 'red' }}
                              onClick={() => this.setArtWorkColor('red')}
                            ></div>
                            <div
                              className="col-md-3 gold"
                              style={{ backgroundColor: 'gold' }}
                              onClick={() => this.setArtWorkColor('gold')}
                            ></div>
                            <div
                              className="col-md-3 black"
                              style={{ backgroundColor: 'black' }}
                              onClick={() => this.setArtWorkColor('black')}
                            ></div>
                            <div
                              className="col-md-3 gray"
                              style={{ backgroundColor: 'gray' }}
                              onClick={() => this.setArtWorkColor('gray')}
                            ></div>
                            <div
                              className="col-md-3 lightgreen"
                              style={{ backgroundColor: 'lightgreen' }}
                              onClick={() => this.setArtWorkColor('lightgreen')}
                            ></div>

                            <button
                              className="btn col-md-5 redo"
                              onClick={() => this.reStoreSelectedMaterial()}
                            >
                              <img
                                src={require('./../assets/img/redo.png')}
                              ></img>
                            </button>
                            <button
                              className="btn col-md-5 delete"
                              onClick={() => this.deleteSelectedMaterial()}
                            >
                              <img
                                src={require('./../assets/img/del.png')}
                              ></img>
                            </button>
                          </div>
                        </div>
                        <Container
                          fluid
                          className="main-content-container px-4"
                        >
                          <DesignCanvas>
                            {components.map((component, idx) => {
                              if (component.type === 'rectangle')
                                return <Rect key={idx} />
                              else return <Text key={idx} />
                            })}
                          </DesignCanvas>
                        </Container>
                        <p className="matsize">
                          <span>
                            MAT SIZE : {wrestling_config.width}m x{' '}
                            {wrestling_config.height}m
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="getquote">
                    <div className="inline-btns">
                      <p>
                        <span className="gq">
                          <a href="#">
                            <img
                              src={require('./../assets/img/gqimg.png')}
                              alt="GET QUOTE"
                            />{' '}
                            Get a Quote
                          </a>
                        </span>
                        <span className="cgrid">
                          <a href="#" onClick={this.clearCanvas}>
                            <img
                              src={require('./../assets/img/del.png')}
                              alt="Delete"
                            />{' '}
                            Clear Grid
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 col-sm-12 text-center pad0 h7">
                  <Toolbar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const setSaveDesignID = id => {
  return {
    type: 'SET_SAVED_ID',
    id: id,
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
    components: [...state.components],
    wrestling_config: state.wrestling_config,
    canvas: state.canvas,
    selectedMaterialColor: state.selectedMaterialColor,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setSaveDesignID, setCanvasConfig }, dispatch)
}

const Wrestling_Designer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default Wrestling_Designer

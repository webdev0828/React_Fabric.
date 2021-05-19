import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";

class ColorToolbar extends React.Component {
  setBackgroundColor = (color, id) => {
    const config = this.props.wrestling_config;
    const res = config.file.replace(".", "-").split("-");
    const fileName = `${res[0]}-${id}.png`;

    const grid = 400 / config.width;
    const width = grid * config.width;
    const height = grid * config.height;

    window.fabric.Image.fromURL(
      require(`./../../../../assets/img/${fileName}`),
      image => {
        this.props.canvas.setBackgroundImage(
          image,
          this.props.canvas.renderAll.bind(this.props.canvas),
          {
            top: 0,
            left: -1,
            width: width,
            height: height
          }
        );
      }
    );

    this.props.canvas.renderAll();

    $(".check-mark-box").css("background", color);
    this.updateCanvasState();
  };

  updateCanvasState = () => {
    let tempConfig = this.props._config;
    if (tempConfig.undoStatus === false && tempConfig.redoStatus === false) {
      let jsonData = this.props.canvas.toJSON();
      let canvasAsJson = JSON.stringify(jsonData);
      if (tempConfig.currentStateIndex < tempConfig.canvasState.length - 1) {
        let indexToBeInserted = tempConfig.currentStateIndex + 1;
        tempConfig.canvasState[indexToBeInserted] = canvasAsJson;

        let numberOfElementsToRetain = indexToBeInserted + 1;
        tempConfig.canvasState = tempConfig.canvasState.splice(
          0,
          numberOfElementsToRetain
        );
      } else {
        tempConfig.canvasState.push(canvasAsJson);
      }

      tempConfig.currentStateIndex = tempConfig.canvasState.length - 1;

      if (
        tempConfig.currentStateIndex === tempConfig.canvasState.length - 1 &&
        tempConfig.currentStateIndex !== -1
      ) {
        tempConfig.redoButton = "disabled";
      }
    }
    this.props.setCanvasConfig(tempConfig);
  };

  render() {
    return (
      <>
        <div className="adddiv">
          <h2>Select Color</h2>
        </div>
        <div className="templatesmain color-lft-blk-menu">
          <div className="row ">
            <div className="col-md-12">
              <div className="check-mark-box"></div>
            </div>
            <div className="col-md-12 mt-15">
              <ul className="nav nav-tabs nav-justified select-color-tab">
                <li>
                  <a data-toggle="tab" href="#presets">
                    MAT COLORS
                  </a>
                </li>
              </ul>
              <div className="tab-content slct-clr-tb-content">
                <div id="presets" className="tab-pane fade in active">
                  <div className="preset-color-row">
                    <div
                      className="pre-clr-box clr-pr1 tooltip"
                      onClick={() => this.setBackgroundColor("#003da7", 0)}
                    >
                      <span className="tooltiptext">Royal Blue</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr2 tooltip"
                      onClick={() => this.setBackgroundColor("#c20430", 1)}
                    >
                      <span className="tooltiptext">Red</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr3 tooltip"
                      onClick={() => this.setBackgroundColor("#dbaa00", 2)}
                    >
                      <span className="tooltiptext">Gold</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr4 tooltip"
                      onClick={() => this.setBackgroundColor("#0d0000", 3)}
                    >
                      <span className="tooltiptext">Black</span>
                    </div>
                  </div>
                  <div className="preset-color-row">
                    <div
                      className="pre-clr-box clr-pr6 tooltip"
                      onClick={() => this.setBackgroundColor("#522d6d", 5)}
                    >
                      <span className="tooltiptext">Purple</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr7 tooltip"
                      onClick={() => this.setBackgroundColor("#ff8400", 6)}
                    >
                      <span className="tooltiptext">Orange</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr8 tooltip"
                      onClick={() => this.setBackgroundColor("#2a5135", 7)}
                    >
                      <span className="tooltiptext">Dark Green</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr9 tooltip"
                      onClick={() => this.setBackgroundColor("#e92076", 8)}
                    >
                      <span className="tooltiptext">Pink</span>
                    </div>
                  </div>
                  <div className="preset-color-row">
                    <div
                      className="pre-clr-box clr-pr10 tooltip"
                      onClick={() => this.setBackgroundColor("#c2c6c9", 9)}
                    >
                      <span className="tooltiptext">Light Grey</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr11 tooltip"
                      onClick={() => this.setBackgroundColor("#1c355e", 10)}
                    >
                      <span className="tooltiptext">Navy</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr12 tooltip"
                      onClick={() => this.setBackgroundColor("#ffffff", 11)}
                    >
                      <span className="tooltiptext">White</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr13 tooltip"
                      onClick={() => this.setBackgroundColor("#5d3428", 12)}
                    >
                      <span className="tooltiptext">Brown</span>
                    </div>
                  </div>
                  <div className="preset-color-row">
                    <div
                      className="pre-clr-box clr-pr14 tooltip"
                      onClick={() => this.setBackgroundColor("#4d4f53", 13)}
                    >
                      <span className="tooltiptext">Charcoal Grey</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr15 tooltip"
                      onClick={() => this.setBackgroundColor("#7f2346", 14)}
                    >
                      <span className="tooltiptext">Maroon</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr16 tooltip"
                      onClick={() => this.setBackgroundColor("#64a0c8", 15)}
                    >
                      <span className="tooltiptext">Carolina Blue</span>
                    </div>
                    <div
                      className="pre-clr-box clr-pr17 tooltip"
                      onClick={() => this.setBackgroundColor("#002c5f", 16)}
                    >
                      <span className="tooltiptext">UWW Mats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const setCanvasConfig = _config => {
  return {
    type: "SET_CONFIG",
    _config
  };
};

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    wrestling_config: state.wrestling_config
  };
};

const mapDispatchToPropsForRect = dispatch => {
  return bindActionCreators({ setCanvasConfig }, dispatch);
};

const ColorToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect
)(ColorToolbar);

class ColorToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById("mySidenav2").style.width = "0";
  };

  render() {
    return (
      <>
        <div
          id="color"
          className="h100 second-menu fordeskview"
          style={{ display: "none" }}
        >
          <ColorToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav2 formobview wo"
          id="mySidenav2"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <ColorToolbarConnect />
        </div>
      </>
    );
  }
}

export default ColorToolSidebar;

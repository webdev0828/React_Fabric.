import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import SaveModal from "./../SaveModal";

class Toolbar extends React.Component {
  undo = e => {
    e.preventDefault();
    let tempConfig = this.props._config;
    if (tempConfig.undoFinishedStatus) {
      if (tempConfig.currentStateIndex === 0) {
        tempConfig.undoStatus = false;
      } else {
        if (tempConfig.canvasState.length >= 0) {
          tempConfig.undoFinishedStatus = 0;
          if (tempConfig.currentStateIndex !== 0) {
            tempConfig.undoStatus = true;
            this.props.canvas.loadFromJSON(
              tempConfig.canvasState[tempConfig.currentStateIndex - 1],
              () => {
                this.props.canvas.renderAll();
                tempConfig.undoStatus = false;
                tempConfig.currentStateIndex -= 1;
                tempConfig.undoButton = "remove disabled";
                if (
                  tempConfig.currentStateIndex !==
                  tempConfig.canvasState.length - 1
                ) {
                  tempConfig.redoButton = "remove disabled";
                }
                tempConfig.undoFinishedStatus = 1;
              }
            );
          } else if (tempConfig.currentStateIndex === 0) {
            this.props.canvas.clear();
            tempConfig.undoFinishedStatus = 1;
            tempConfig.undoButton = "disabled";
            tempConfig.redoButton = "remove disabled";
            tempConfig.currentStateIndex -= 1;
          }
        }
      }
    }

    this.props.setCanvasConfig(tempConfig);
  };

  redo = e => {
    e.preventDefault();
    let tempConfig = this.props._config;
    if (tempConfig.redoFinishedStatus) {
      if (
        tempConfig.currentStateIndex === tempConfig.canvasState.length - 1 &&
        tempConfig.currentStateIndex !== -1
      ) {
        tempConfig.redoButton = "disabled";
      } else {
        if (
          tempConfig.canvasState.length > tempConfig.currentStateIndex &&
          tempConfig.canvasState.length !== 0
        ) {
          tempConfig.redoFinishedStatus = 0;
          tempConfig.redoStatus = true;
          this.props.canvas.loadFromJSON(
            tempConfig.canvasState[tempConfig.currentStateIndex + 1],
            () => {
              this.props.canvas.renderAll();
              tempConfig.redoStatus = false;
              tempConfig.currentStateIndex += 1;
              if (tempConfig.currentStateIndex !== -1) {
                tempConfig.undoButton = "remove disabled";
              }
              tempConfig.redoFinishedStatus = 1;
              if (
                tempConfig.currentStateIndex ===
                  tempConfig.canvasState.length - 1 &&
                tempConfig.currentStateIndex !== -1
              ) {
                tempConfig.redoButton = "disabled";
              }
            }
          );
        }
      }
    }

    this.props.setCanvasConfig(tempConfig);
  };

  save = (title, email) => {
    const length = this.props.wallpad_config["config"].length;
    let canvas_data = [];
    for (let i = 0; i < length; i++)
      canvas_data.push({
        data: JSON.stringify(this.props.wallpad_config["config"][i].canvas),
        config: {
          height: this.props.wallpad_config["config"][i].height,
          width: this.props.wallpad_config["config"][i].width,
          grid: this.props.wallpad_config["config"][i].canvas_grid
        }
      });
    const data = {
      data: canvas_data,
      email,
      title,
      url: "http://localhost:3002/wallpad_save_designer/"
    };
    axios.post("http://localhost:3001/save_design", data).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <>
        <div className="mobbtns">
          <div className="innermobbtns">
            <ul>
              <li>
                <a href="#" onClick={this.undo}>
                  <img
                    src={require("./../../../assets/img/undo.png")}
                    alt="UNDO"
                  />
                  <span>Undo</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={this.redo}>
                  <img
                    src={require("./../../../assets/img/redo.png")}
                    alt="REDO"
                  />
                  <span>Redo</span>
                </a>
              </li>
              <li>
                <SaveModal save={this.save} />
              </li>
              <li>
                <a href="#">
                  <img
                    src={require("./../../../assets/img/email.png")}
                    alt="EMAIL"
                  />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const setCanvasConfig = _config => {
  return {
    type: "WALLPAD_SET_CONFIG",
    _config
  };
};

const mapStateToProps = state => {
  return {
    _config: state._config,
    canvas: state.canvas,
    wallpad_config: state.wallpad_config
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setCanvasConfig }, dispatch);
};

const ToolbarConnect = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarConnect;

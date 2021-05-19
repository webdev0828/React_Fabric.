import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CurvedText extends React.Component {
  componentDidMount() {
    let config_style = this.props.text_style;
    config_style.radius = 500;
    config_style.textAlign = "center";
    if (config_style.effect === "arc") config_style.spacing = 1;
    if (config_style.effect === "curved") config_style.spacing = 10;
    if (config_style.effect === "STRAIGHT") config_style.spacing = 1;
    var text = new window.fabric.CurvedText(config_style.text, config_style);

    text["setControlVisible"]("ml", false);
    text["setControlVisible"]("mb", false);
    text["setControlVisible"]("mr", false);
    text["setControlVisible"]("mt", false);
    text["setControlVisible"]("tr", false);
    text["cornerSize"] = 6;

    this.props.canvas.add(text);

    this.props.canvas.setActiveObject(text);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  }

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
    return null;
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
    _config: state._config,
    text_style: state.text_style
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig
    },
    dispatch
  );
};

const CurvedTextConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurvedText);

export default CurvedTextConnect;

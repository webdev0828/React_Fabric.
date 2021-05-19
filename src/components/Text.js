import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Text extends React.Component {
  static propTypes = {
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
  };

  static defaultProps = {
    top: 0,
    left: 0,
    radius: 5,
    fill: "red"
  };

  componentDidMount() {
    const selected_text = this.props.selected_text;
    const text = new window.fabric.Text(selected_text, {});
    text.set("fontSize", 20);

    text["setControlVisible"]("ml", false);
    text["setControlVisible"]("mb", false);
    text["setControlVisible"]("mr", false);
    text["setControlVisible"]("mt", false);

    text["cornerSize"] = 6;

    this.props.canvas.add(text);

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
    selected_text: state.selected_text
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

const TextConnect = connect(mapStateToProps, mapDispatchToProps)(Text);

export default TextConnect;

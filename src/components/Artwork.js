import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Artwork extends React.Component {
  componentDidMount() {
    const image_url = this.props.image_url;
    window.fabric.loadSVGFromURL(image_url, (objects, options) => {
      let shape = window.fabric.util.groupSVGElements(objects, options);
      shape.set({
        left: 0,
        right: 0
      });

      shape.scale(0.5);

      shape["setControlVisible"]("ml", false);
      shape["setControlVisible"]("mb", false);
      shape["setControlVisible"]("mr", false);
      shape["setControlVisible"]("mt", false);
      shape["cornerSize"] = 6;

      this.props.canvas.add(shape);
      this.props.canvas.renderAll();
      this.updateCanvasState();
    });
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
    image_url: state.image_url
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

const ArtworkConnect = connect(mapStateToProps, mapDispatchToProps)(Artwork);

export default ArtworkConnect;

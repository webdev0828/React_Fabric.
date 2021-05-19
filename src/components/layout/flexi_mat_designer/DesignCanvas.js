import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import $ from "jquery";

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  static defaultProps = {
    width: 400,
    height: 480
  };

  state = {
    canvas: null,
    colors: [
      ["#d4d2ca", "#ffffff"],
      ["#99968d", "#c4c8c9"],
      ["#b7930d", "#e5c65c"],
      ["#9f4d03", "#ff7900"],
      ["#66081c", "#b71234"],
      ["#112718", "#284e35"],
      ["#4a122a", "#7d2349"],
      ["#311914", "#522d24"],
      ["#000000", "#0e0000"],
      ["#241634", "#4c306b"],
      ["#222326", "#4e4f53"],
      ["#16243d", "#263e6a"],
      ["#022252", "#0146ad"],
      ["#3e657f", "#65a0c8"],
      ["#2a5737", "#65c883"]
    ]
  };

  componentDidUpdate() {
    const load_design = this.props.load_design;
    const saved_id = this.props.saved_id;
    if (load_design) {
      axios
        .post("http://localhost:3001/load_design", { id: saved_id })
        .then(res => {
          let tempConfig = res.data;

          let objs = null;

          this.props.canvas.loadFromJSON(tempConfig, () => {
            objs = this.props.canvas.getObjects();
            objs.map((obj, idx) => {
              obj["setControlVisible"]("ml", false);
              obj["setControlVisible"]("mb", false);
              obj["setControlVisible"]("mr", false);
              obj["setControlVisible"]("mt", false);
              obj["setControlVisible"]("tr", false);
              obj["cornerSize"] = 6;
              if (obj.type === "rect") {
                obj["hasControls"] = false;
                obj["lockMovementX"] = true;
                obj["lockMovementY"] = true;
              }

              if (obj.type === "curvedText") {
                obj.letters._objects.map(o => (o.originalLeft = 0));
                let style = {
                  fontFamily: obj.fontFamily,
                  fontSize: obj.fontSize,
                  fontStyle: obj.fontStyle,
                  fontWeight: obj.fontWeight,
                  fill: obj.fill,
                  effect: obj.effect,
                  radius: obj.radius,
                  top: obj.top,
                  left: obj.left,
                  lineHeight: obj.lineHeight,
                  spacing: obj.spacing,
                  stroke: obj.stroke,
                  strokeWidth: obj.strokeWidth,
                  textAlign: obj.textAlign
                };
                let replaceText = new window.fabric.CurvedText(obj.text, style);
                replaceText["setControlVisible"]("ml", false);
                replaceText["setControlVisible"]("mb", false);
                replaceText["setControlVisible"]("mr", false);
                replaceText["setControlVisible"]("mt", false);
                replaceText["setControlVisible"]("tr", false);
                replaceText["cornerSize"] = 6;
                this.props.canvas.remove(obj);
                this.props.canvas.insertAt(replaceText, idx, false);
              }
            });
          });
          this.props.canvas.renderAll();
          this.props.setCanvasConfig(tempConfig);
          this.props.setDisableLoad();
        });
    }
  }

  componentDidMount() {
    const canvas = new window.fabric.Canvas(this.c);

    const t = new window.fabric.Text("", { fontFamily: "Times New Roman" });
    canvas.add(t);

    let left = 0;
    let top = 0;
    let width = 400;
    let height = 100;
    for (let i = 0; i < 5; i++) {
      let rect = new window.fabric.Rect({
        left: left,
        top: top,
        width: width,
        height: height,
        selectable: false
      });

      top += height;
      rect.setGradient("fill", {
        type: "linear",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: rect.height,
        colorStops: {
          0: this.state.colors[this.props.flexi_smooth_index][0],
          0.5: this.state.colors[this.props.flexi_smooth_index][1],
          1: this.state.colors[this.props.flexi_smooth_index][1]
        }
      });
      canvas.add(rect);
    }

    this.props.setCanvas(canvas);

    canvas.on("object:selected", e => {
      let activeObject = this.props.canvas._activeObject;
      if (
        activeObject.__proto__.type === "text" ||
        activeObject.__proto__.type === "curvedText"
      ) {
        // add the delete button
        this.addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);

        $(".second-menu").hide();
        $("#text").show();
        // font family
        let fontFamily = activeObject.get("fontFamily");
        $(".slct-font-fam").val(fontFamily);
        // font size
        let fontSize = activeObject.get("fontSize");
        $(".slct-font-size").val(`${fontSize}px`);
        // font weight
        let fontWeight = activeObject.get("fontWeight");
        if (fontWeight === "bold") {
          $("#bold").addClass("active");
        }
        // font style
        let fontStyle = activeObject.get("fontStyle");
        if (fontStyle === "italic") {
          $("#italic").addClass("active");
        }
        // text decoration
        let textDecoration = activeObject.get("textDecoration");
        if (textDecoration === "underline") {
          $("#underline").addClass("active");
        }
        // capital text
        let capitalText = activeObject.text;
        if (capitalText === capitalText.toUpperCase()) {
          $("#capital").addClass("active");
        }
        // text align
        let text_align = activeObject.get("textAlign");
        switch (text_align) {
          case "left":
            $("#left-align").addClass("active");
            break;
          case "center":
            $("#center-align").addClass("active");
            break;
          case "right":
            $("#right-align").addClass("active");
            break;
          default:
            break;
        }
        // line heigth
        let line_height = activeObject.get("lineHeight");
        $("#line_ht_get").val(Math.floor(line_height));
        $("#line_ht_set").val(Math.floor(line_height));
        $("#line_ht_get").css({
          background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${(line_height /
            10) *
            10}%, #fff ${(line_height / 10) * 10}%, #fff 100%)`
        });
        // spacing
        let spacing = activeObject.get("spacing");
        $("#spacing_get").val(spacing);
        $("#spacing_set").val(spacing);
        $("#spacing_get").css({
          background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${(spacing /
            10) *
            10}%, #fff ${(spacing / 10) * 10}%, #fff 100%)`
        });
        // text color
        let text_color = activeObject.get("fill");
        $("#text-color-bind").css({ background: text_color });
        // outline width
        let outline_width = activeObject.get("strokeWidth");
        $("#size_get").val(outline_width);
        $("#size_set").val(outline_width);
        $("#size_get").css({
          background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${outline_width *
            10}%, #fff ${outline_width * 10}%, #fff 100%)`
        });
        // outline color
        let stroke_color = activeObject.get("stroke");
        $("#outline-color-bind").css({ background: stroke_color });
        // text style (arc)

        // selected text
        let selected_text = activeObject.text;
        $("#selected_text").val(selected_text);
        $(".add-text-btn").text("Update Text");
      } else {
        $(".deleteBtn").css("visibility", "hidden");
      }
    });

    canvas.on("selection:cleared", () => {
      $(".deleteBtn").css("visibility", "hidden");

      $(".text-color-pane").css({ display: "none" });
      $("#bold").removeClass("active");
      $("#italic").removeClass("active");
      $("#underline").removeClass("active");
      $("#capital").removeClass("active");
      $("#left-align").removeClass("active");
      $("#center-align").removeClass("active");
      $("#right-align").removeClass("active");
      $(".slct-font-size").val($(".slct-font-size option:first").val());
      $(".slct-font-fam").val($(".slct-font-fam option:first").val());
      $("#line_ht_get").val(1);
      $("#line_ht_get").css({
        background: `linear-gradient(to right, #1baa92 0%, #1baa92 5%, #fff 5%, #fff 100%)`
      });
      $("#line_ht_set").val(1);
      $("#spacing_get").val(1);
      $("#spacing_get").css({
        background: `linear-gradient(to right, #1baa92 0%, #1baa92 5%, #fff 5%, #fff 100%)`
      });
      $("#spacing_set").val(1);
      $("#text-color-bind").css({ background: "black" });
      $("#size_get").val(0);
      $("#size_get").css({
        background: `linear-gradient(to right, #1baa92 0%, #1baa92 5%, #fff 5%, #fff 100%)`
      });
      $("#size_set").val(0);
      $("#outline-color-bind").css({ background: "black" });
      $("#selected_text").val("sampletext");
      $(".add-text-btn").text("Add Text");
    });

    canvas.on("object:added", () => {});

    canvas.on("object:moving", e => {
      let activeObject = this.props.canvas._activeObject;
      if (activeObject.__proto__.type === "curvedText")
        this.addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    canvas.on("object:modified", e => {
      if (!this.props.load_design) this.updateCanvasState();
      let activeObject = this.props.canvas._activeObject;
      if (activeObject.__proto__.type === "curvedText")
        this.addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
  }

  addDeleteBtn = (x, y) => {
    const btnLeft = x - 10;
    const btnTop = y - 10;

    $(".canvas-container").append($(".deleteBtn"));
    $(".deleteBtn").css("visibility", "visible");
    $(".deleteBtn").css("top", `${btnTop}px`);
    $(".deleteBtn").css("left", `${btnLeft}px`);
  };

  deleteSelectedText = () => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject) {
      this.props.canvas.remove(activeObject);
      this.updateCanvasState();
    }
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
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.props.canvas
      });
    });

    const flexi_config = this.props.flexi_config;
    const length =
      flexi_config.width / 1 > flexi_config.height / 1
        ? flexi_config.width
        : flexi_config.height;

    const grid = (this.props.width - 1) / length;
    const width = grid * flexi_config.width;
    const height = grid * flexi_config.height;

    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.props.canvas && children}
        <img
          className="deleteBtn"
          src={require("./../../../assets/img/delete.png")}
          alt="delteBtn"
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            visibility: "hidden"
          }}
          onClick={this.deleteSelectedText}
        />
      </Fragment>
    );
  }
}

const setMaterialChanged = changed => {
  return {
    type: "SET_FLEXI_MATERIAL_CHANGED",
    changed: changed
  };
};

const setCanvas = canvas => {
  return {
    type: "SET_CANVAS",
    canvas: canvas
  };
};

const setCanvasConfig = _config => {
  return {
    type: "SET_CONFIG",
    _config
  };
};

const setDisableLoad = () => {
  return {
    type: "DISABLE_DESIGN_LOAD"
  };
};

const setComponentType = type => {
  return {
    type: "SET_COMPONENT_TYPE",
    component_type: type
  };
};

const clearCanvas = () => {
  return {
    type: "CLAER_CANVAS",
    isCanvasCleared: false
  };
};

// custom
const setImageUrl = url => {
  return {
    type: "SET_IMAGE_URL",
    image_url: url
  };
};

const addNewImage = image => {
  return {
    type: "NEW_IMAGE",
    component: image
  };
};

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    load_design: state.load_design,
    saved_id: state.saved_id,
    flexi_material_changed: state.flexi_material_changed,
    flexi_type: state.flexi_type,
    flexi_config: state.flexi_config,
    flexi_smooth_index: state.flexi_smooth_index
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig,
      setDisableLoad,
      setCanvas,
      clearCanvas,
      setImageUrl,
      addNewImage,
      setMaterialChanged,
      setComponentType
    },
    dispatch
  );
};

const DesignCanvasState = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignCanvas);

export default DesignCanvasState;

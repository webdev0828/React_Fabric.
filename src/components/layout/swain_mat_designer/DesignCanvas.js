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
    height: 400
  };

  state = {
    canvas: null,
    width: null,
    height: null
  };

  componentDidUpdate() {
    if (this.props.isCanvasCleared) {
      const config = this.props.swain_config;

      let grid = (this.props.width - 5) / config.width;
      let unitScale = (this.props.width - 1) / config.width;
      let canvasWidth = config.width * unitScale;
      let canvasHeight = config.height * unitScale;

      for (let i = 0; i <= config.width; i++) {
        this.props.canvas.add(
          new window.fabric.Line([i * grid, 0, i * grid, canvasHeight], {
            type: "line",
            stroke: "#716b6b",
            selectable: false
          })
        );
      }

      for (let i = 0; i <= config.height; i++) {
        this.props.canvas.add(
          new window.fabric.Line([0, i * grid, canvasWidth, i * grid], {
            type: "line",
            stroke: "#716b6b",
            selectable: false
          })
        );
      }
      this.props.clearCanvas();
    }
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
          let grid =
            (tempConfig.objects[2].left - tempConfig.objects[1].left) / 1;
          this.props.setCanvasGrid(grid);
          this.props.setDisableLoad();
        });
    }
  }

  componentDidMount() {
    const canvas = new window.fabric.Canvas(this.c);
    let config = null;

    let length = null;

    let grid = null;
    let unitScale = null;
    let canvasWidth = 400;
    let canvasHeight = 400;

    if (!this.props.load_design) {
      const t = new window.fabric.Text("", { fontFamily: "Times New Roman" });
      canvas.add(t);
      config = this.props.swain_config;

      length =
        config.width / 1 > config.height / 1 ? config.width : config.height;

      grid = (this.props.width - 3) / length;
      unitScale = (this.props.width - 3) / length;
      canvasWidth = config.width * unitScale;
      canvasHeight = config.height * unitScale;

      this.props.setCanvasGrid(grid);
      for (let i = 0; i <= config.width; i++) {
        canvas.add(
          new window.fabric.Line([i * grid, 0, i * grid, canvasHeight], {
            type: "line",
            stroke: "#716b6b",
            selectable: false
          })
        );
      }

      for (let i = 0; i <= config.height; i++) {
        canvas.add(
          new window.fabric.Line([0, i * grid, canvasWidth, i * grid], {
            type: "line",
            stroke: "#716b6b",
            selectable: false
          })
        );
      }

      this.updateDirectCanvasState(canvas);
    }

    this.props.setCanvas(canvas);

    canvas.on("object:moving", e => {
      let activeObject = this.props.canvas._activeObject;
      if (
        activeObject.__proto__.type === "rect" &&
        activeObject.hasControls !== false
      ) {
        activeObject.set({
          left: Math.round(activeObject.left / grid) * grid,
          top: Math.round(activeObject.top / grid) * grid
        });
      }
      if (activeObject.__proto__.type === "curvedText")
        this.addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

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
      } else if (activeObject.__proto__.type === "image") {
      } else if (activeObject.__proto__.type === "rect") {
        $(".material-color-pane").css({ display: "block" });
        let selectedColor = activeObject.get("fill");
        this.props.setSelectedMaterialColor(selectedColor);
      }
    });

    canvas.on("selection:cleared", () => {
      $(".deleteBtn").css("visibility", "hidden");
      $(".material-color-pane").css({ display: "none" });
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

    $(".mar").mousemove(e => {
      let canvas_grid = grid === null ? this.props.canvas_grid : grid;
      if (this.props.drag_new_rect) {
        let width = $("#dragged_image").css("width");
        let height = $("#dragged_image").css("height");
        const top = e.pageY - height.replace("px", "") / 2;
        const left = e.pageX - width.replace("px", "") / 2;
        $("#dragged_image").css({
          position: "fixed",
          top: top,
          left: left
        });

        let position = $(".canvas-container").offset();

        let preview_top =
          $("#dragged_image")
            .css("top")
            .replace("px", "") /
            1 -
          position.top;
        let preview_left =
          $("#dragged_image")
            .css("left")
            .replace("px", "") /
            1 -
          position.left;

        if (
          preview_top > -height.replace("px", "") / 2 &&
          preview_top < canvasHeight - height.replace("px", "") / 2 &&
          preview_left > -width.replace("px", "") / 2 &&
          preview_left < canvasWidth - width.replace("px", "") / 2
        ) {
          $("#previewed_image").css({
            position: "fixed",
            display: "block",
            top:
              Math.round(preview_top / canvas_grid) * canvas_grid +
              position.top,
            left:
              Math.round(preview_left / canvas_grid) * canvas_grid +
              position.left
          });
        } else {
          $("#previewed_image").css({
            display: "none"
          });
        }
      }

      if (this.props.drag_new_template) {
        let width_template = $("#dragged_template").css("width");
        let height_template = $("#dragged_template").css("height");
        const top_template = e.pageY - height_template.replace("px", "") / 2;
        const left_template = e.pageX - width_template.replace("px", "") / 2;
        $("#dragged_template").css({
          position: "fixed",
          top: top_template,
          left: left_template
        });

        let position = $(".canvas-container").offset();

        let preview_top =
          $("#dragged_template")
            .css("top")
            .replace("px", "") /
            1 -
          position.top;
        let preview_left =
          $("#dragged_template")
            .css("left")
            .replace("px", "") /
            1 -
          position.left;

        if (
          preview_top >= -height_template.replace("px", "") / 2 &&
          preview_top <= canvasHeight - height_template.replace("px", "") / 2 &&
          preview_left >= -width_template.replace("px", "") / 2 &&
          preview_left <= canvasWidth - -width_template.replace("px", "") / 2
        ) {
          $("#previewed_image").css({
            position: "fixed",
            display: "block",
            top: Math.round(preview_top / grid) * grid + position.top,
            left: Math.round(preview_left / grid) * grid + position.left
          });
        } else {
          $("#previewed_image").css({
            display: "none"
          });
        }
      }
    });

    $("#drag_image").mousemove(e => {
      if (this.props.drag_new_rect) {
        let width = $("#dragged_image").css("width");
        let height = $("#dragged_image").css("height");
        const top = e.pageY - height.replace("px", "") / 2;
        const left = e.pageX - width.replace("px", "") / 2;
        $("#dragged_image").css({
          position: "fixed",
          top: top,
          left: left
        });
      }
    });

    $("#drag_template").mousemove(e => {
      if (this.props.drag_new_template) {
        let width_template = $("#dragged_template").css("width");
        let height_template = $("#dragged_template").css("height");
        const top_template = e.pageY - height_template.replace("px", "") / 2;
        const left_template = e.pageX - width_template.replace("px", "") / 2;
        $("#dragged_template").css({
          position: "fixed",
          top: top_template,
          left: left_template
        });
      }
    });

    $("#drag_image").mouseup(() => {
      if (this.props.drag_new_rect) {
        let position = $(".canvas-container").offset();
        const data = {
          top:
            $("#dragged_image")
              .css("top")
              .replace("px", "") /
              1 -
            position.top,
          left:
            $("#dragged_image")
              .css("left")
              .replace("px", "") /
              1 -
            position.left
        };

        let width = $("#dragged_image").css("width");
        let height = $("#dragged_image").css("height");

        if (
          data.top < canvasHeight - height.replace("px", "") / 2 &&
          data.top > -height.replace("px", "") / 2 &&
          data.left >= -width.replace("px", "") / 2 &&
          data.left <= canvasWidth - width.replace("px", "") / 2
        ) {
          this.props.setMaterialPosition(data);
          const rect = new window.fabric.Rect({
            left: 0,
            top: 0,
            width: 50,
            height: 50,
            type: "rectangle",
            fill: "#fab"
          });
          this.props.addNewRect(rect);
        }

        this.props.setDragRect(false);
        $("#dragged_image").remove();
        $("#previewed_image").remove();
      }
    });

    $("#drag_template").mouseup(() => {
      if (this.props.drag_new_template) {
        let position = $(".canvas-container").offset();
        const data = {
          top:
            $("#dragged_template")
              .css("top")
              .replace("px", "") /
              1 -
            position.top,
          left:
            $("#dragged_template")
              .css("left")
              .replace("px", "") /
              1 -
            position.left
        };

        let width = $("#dragged_template").css("width");
        let height = $("#dragged_template").css("height");

        if (
          data.top < canvasHeight - height.replace("px", "") / 2 &&
          data.top > -height.replace("px", "") / 2 &&
          data.left >= -width.replace("px", "") / 2 &&
          data.left <= canvasWidth - width.replace("px", "") / 2
        ) {
          this.props.setTemplatePosition(data);
          const template = {
            type: this.props.template_type
          };

          this.props.addNewTemplate(template);
        }

        $("#dragged_template").remove();
        $("#previewed_image").remove();
        this.props.setDragTemplate(false);
      }
    });
  }

  updateDirectCanvasState = canvas => {
    let tempConfig = this.props._config;
    if (tempConfig.undoStatus === false && tempConfig.redoStatus === false) {
      let jsonData = canvas.toJSON();
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

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.props.canvas
      });
    });

    const swain_config = this.props.swain_config;
    const length =
      swain_config.width / 1 > swain_config.height / 1
        ? swain_config.width
        : swain_config.height;

    const grid = (this.props.width - 1) / length;
    const width = grid * swain_config.width;
    const height = grid * swain_config.height;

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

const setDragRect = drag_new_rect => {
  return {
    type: "DRAG_NEW_RECT",
    drag_new_rect: drag_new_rect
  };
};

const setDragTemplate = drag_new_template => {
  return {
    type: "DRAG_NEW_TEMPLATE",
    drag_new_template: drag_new_template
  };
};

const setDisableLoad = () => {
  return {
    type: "DISABLE_DESIGN_LOAD"
  };
};

const setCanvasGrid = grid => {
  return {
    type: "SET_CANVAS_GRID",
    grid: grid
  };
};

const setMaterialPosition = data => {
  return {
    type: "SET_MATERIAL_POSITION",
    data: data
  };
};

const addNewRect = rect => {
  return {
    type: "NEW_RECT",
    component: rect
  };
};

const addNewTemplate = template => {
  return {
    type: "NEW_TEMPLATE",
    component: template
  };
};
const setSelectedMaterialColor = color => {
  return {
    type: "SET_SELECTEED_MATERIAL_COLOR",
    color: color
  };
};

const setTemplatePosition = data => {
  return {
    type: "SET_TEMPLATE_POSITION",
    data: data
  };
};

const clearCanvas = () => {
  return {
    type: "CLAER_CANVAS",
    isCanvasCleared: false
  };
};

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    load_design: state.load_design,
    saved_id: state.saved_id,
    swain_config: state.swain_config,
    drag_new_rect: state.drag_new_rect,
    mat_color: state.mat_color,
    mat_type: state.mat_type,
    canvas_grid: state.canvas_grid,
    template_type: state.template_type,
    drag_new_template: state.drag_new_template,
    templates_width: state.templates_width,
    isCanvasCleared: state.isCanvasCleared
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig,
      setDisableLoad,
      setCanvasGrid,
      setCanvas,
      setSelectedMaterialColor,
      setDragRect,
      setMaterialPosition,
      addNewRect,
      setTemplatePosition,
      addNewTemplate,
      setDragTemplate,
      clearCanvas
    },
    dispatch
  );
};

const DesignCanvasState = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignCanvas);

export default DesignCanvasState;

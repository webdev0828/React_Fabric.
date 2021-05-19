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
    height: null,
    config: null
  };

  componentDidUpdate() {}

  componentDidMount() {
    let config = null;
    let length = null;
    let grid = null;
    let unitScale = null;
    let canvasWidth = null;
    let canvasHeight = null;

    if (!this.props.load_design) {
      for (let i = 0; i < this.props.wallpad_config["config"].length; i++) {
        let canvas = null;
        switch (i) {
          case 0:
            canvas = new window.fabric.Canvas(this.c0);
            break;
          case 1:
            canvas = new window.fabric.Canvas(this.c1);
            break;
          case 2:
            canvas = new window.fabric.Canvas(this.c2);
            break;
          default:
            canvas = new window.fabric.Canvas(this.c3);
            break;
        }
        config = this.props.wallpad_config["config"][i];

        length =
          config.width / 1 > config.height / 1 ? config.width : config.height;

        grid = (this.props.width - 3) / length;
        unitScale = (this.props.width - 3) / length;
        canvasWidth = config.width * unitScale;
        canvasHeight = config.height * unitScale;

        const t = new window.fabric.Text("", { fontFamily: "Times New Roman" });
        canvas.add(t);

        this.props.setCanvasGrid(i, grid);

        for (let i = 1; i < config.width; i++) {
          canvas.add(
            new window.fabric.Line([i * grid, 0, i * grid, canvasHeight], {
              type: "line",
              stroke: "black",
              strokeDashArray: [5, 5],
              selectable: false
            })
          );
        }

        for (let i = 1; i < config.height; i++) {
          canvas.add(
            new window.fabric.Line([0, i * grid, canvasWidth, i * grid], {
              type: "line",
              stroke: "black",
              strokeDashArray: [5, 5],
              selectable: false
            })
          );
        }
        if (i === 0) this.props.setDefaultCanvas(canvas);
        this.props.setCanvas(i, canvas);

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
          $(".text-color-pane").css({ display: "none" });
          $(".deleteBtn").css("visibility", "hidden");

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
    } else {
      const saved_id = this.props.saved_id;
      axios
        .post("http://localhost:3001/load_design", { id: saved_id })
        .then(res => {
          let tempConfig = res.data;
          this.setState({ config: tempConfig });
          tempConfig.map((temp, idx) => {
            let canvas = null;
            length =
              temp.config.width / 1 > temp.config.height / 1
                ? temp.config.width
                : temp.config.height;

            grid = (this.props.width - 3) / length;
            unitScale = (this.props.width - 3) / length;
            canvasWidth = temp.config.width * unitScale;
            canvasHeight = temp.config.height * unitScale;
            switch (idx) {
              case 0:
                canvas = new window.fabric.Canvas(this.c0);
                this.props.setDefaultCanvas(canvas);
                break;
              case 1:
                canvas = new window.fabric.Canvas(this.c1);
                break;
              case 2:
                canvas = new window.fabric.Canvas(this.c2);
                break;
              default:
                canvas = new window.fabric.Canvas(this.c3);
                break;
            }
            canvas.loadFromJSON(temp.data, () => {
              this.props.setSavedCanvas(idx, temp.config, canvas);
              let objs = canvas.getObjects();
              objs.map((obj, index) => {
                obj["setControlVisible"]("ml", false);
                obj["setControlVisible"]("mb", false);
                obj["setControlVisible"]("mr", false);
                obj["setControlVisible"]("mt", false);
                obj["setControlVisible"]("tr", false);
                obj["cornerSize"] = 6;
                if (obj.type === "line") {
                  obj["hasControls"] = false;
                  obj["lockMovementX"] = true;
                  obj["lockMovementY"] = true;
                }

                if (obj.type === "curvedText") {
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
                  let replaceText = new window.fabric.CurvedText(
                    obj.text,
                    style
                  );
                  replaceText["setControlVisible"]("ml", false);
                  replaceText["setControlVisible"]("mb", false);
                  replaceText["setControlVisible"]("mr", false);
                  replaceText["setControlVisible"]("mt", false);
                  replaceText["setControlVisible"]("tr", false);
                  replaceText["cornerSize"] = 6;
                  canvas.remove(obj);
                  canvas.insertAt(replaceText, index, false);
                }
              });
              canvas.renderAll();
            });
          });
        });
    }
  }

  addDeleteBtn = (x, y) => {
    const current_wallpad = this.props.wallpad_config.current_wallpad;
    const btnLeft = x - 10;
    const btnTop = y - 10;

    $(`.canvas-container:eq(${current_wallpad})`).append($(".deleteBtn"));
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

    if (this.props.load_design) {
      const wallpad_configs = this.state.config;
      if (wallpad_configs === null) return <div />;

      return (
        <>
          <Fragment>
            {wallpad_configs.map((wallpad, index) => {
              const length =
                wallpad.config.width / 1 > wallpad.config.height / 1
                  ? wallpad.config.width
                  : wallpad.config.height;

              const grid = (this.props.width - 1) / length;
              const width = grid * wallpad.config.width;
              const height = grid * wallpad.config.height;
              switch (index) {
                case 0:
                  return (
                    <canvas
                      className="wallpad_0"
                      ref={c => (this.c0 = c)}
                      width={width}
                      height={height}
                      key={index}
                    />
                  );
                case 1:
                  return (
                    <canvas
                      className="wallpad_1"
                      ref={c => (this.c1 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
                case 2:
                  return (
                    <canvas
                      className="wallpad_2"
                      ref={c => (this.c2 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
                default:
                  return (
                    <canvas
                      className="wallpad_3"
                      ref={c => (this.c3 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
              }
            })}
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
        </>
      );
    } else {
      const wallpad_configs = this.props.wallpad_config["config"];

      return (
        <>
          <Fragment>
            {wallpad_configs.map((config, index) => {
              const length =
                config.width / 1 > config.height / 1
                  ? config.width
                  : config.height;

              const grid = (this.props.width - 1) / length;
              const width = grid * config.width;
              const height = grid * config.height;
              switch (index) {
                case 0:
                  return (
                    <canvas
                      className="wallpad_0"
                      ref={c => (this.c0 = c)}
                      width={width}
                      height={height}
                      key={index}
                    />
                  );
                case 1:
                  return (
                    <canvas
                      className="wallpad_1"
                      ref={c => (this.c1 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
                case 2:
                  return (
                    <canvas
                      className="wallpad_2"
                      ref={c => (this.c2 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
                default:
                  return (
                    <canvas
                      className="wallpad_3"
                      ref={c => (this.c3 = c)}
                      width={width}
                      height={height}
                      style={{ display: "none" }}
                      key={index}
                    />
                  );
              }
            })}
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
        </>
      );
    }
  }
}

const setCanvas = (index, canvas) => {
  return {
    type: "SET_WALLPAD_CANVAS",
    index,
    canvas
  };
};

const setSavedCanvas = (idx, config, canvas) => {
  return {
    type: "SET_SAVED_WALLPAD",
    idx,
    config,
    canvas
  };
};

const setDefaultCanvas = canvas => {
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

const setCanvasGrid = grid => {
  return {
    type: "SET_CANVAS_GRID",
    grid: grid
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
    wallpad_config: state.wallpad_config,
    canvas_grid: state.canvas_grid,
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
      setDefaultCanvas,
      setSavedCanvas,
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

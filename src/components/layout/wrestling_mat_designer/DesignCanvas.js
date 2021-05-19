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
    canvas_width: 400,
    canvas_height: 400
  };

  componentDidUpdate() {
    const load_design = this.props.load_design;
    const saved_id = this.props.saved_id;
    if (load_design) {
      axios
        .post("http://localhost:3001/load_design", { id: saved_id })
        .then(res => {
          let tempConfig = res.data;

          const objects = tempConfig.objects;

          let objs = null;

          objects.map((object, idx) => {
            switch (object.type) {
              case "circle":
                object.lockMovementX = true;
                object.lockMovementY = true;
                object.lockUniScaling = true;
                object.lockScalingX = true;
                object.lockScalingY = true;
                break;
              case "group":
                objs = object.objects;
                objs.map(obj => {
                  obj.lockMovementX = true;
                  obj.lockMovementY = true;
                  obj.lockUniScaling = true;
                  obj.lockScalingX = true;
                  obj.lockScalingY = true;
                });
                break;
            }
          });

          this.props.canvas.loadFromJSON(tempConfig, () => {
            objs = this.props.canvas.getObjects();
            objs.map((obj, idx) => {
              obj["setControlVisible"]("ml", false);
              obj["setControlVisible"]("mb", false);
              obj["setControlVisible"]("mr", false);
              obj["setControlVisible"]("mt", false);
              obj["setControlVisible"]("tr", false);
              obj["cornerSize"] = 6;
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

    const config = this.props.wrestling_config;
    if (config.isNewMaterial) {
      let config = this.props.wrestling_config;
      config.isNewMaterial = false;
      this.props.setWrestlingConfig(
        config.width,
        config.height,
        config.isNewMaterial,
        config.file
      );

      const grid = this.props.width / config.width;
      const width = grid * config.width;
      const height = grid * config.height;

      this.props.setImageUrl(require("./../../../assets/img/mat-desing.jpg"));
      window.fabric.Image.fromURL(
        require(`./../../../assets/img/${config.file}`),
        image => {
          this.props.canvas.setBackgroundImage(
            image,
            this.props.canvas.renderAll.bind(this.props.canvas),
            {
              top: 0,
              left: 0,
              width: width,
              height: height
            }
          );
        }
      );
      this.updateDirectCanvasState(this.props.canvas);
    }
  }

  componentDidMount() {
    const canvas = new window.fabric.Canvas(this.c);
    const config = this.props.wrestling_config;
    const grid = this.props.width / config.width;
    const width = grid * config.width;
    const height = grid * config.height;

    if (!this.props.load_design) {
      const t = new window.fabric.Text("", { fontFamily: "Times New Roman" });
      canvas.add(t);

      this.props.setImageUrl(require(`./../../../assets/img/${config.file}`));
      window.fabric.Image.fromURL(
        require("./../../../assets/img/42x42.png"),
        image => {
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
            top: 0,
            left: -1,
            width: width,
            height: height
          });
        }
      );
      this.updateDirectCanvasState(canvas);
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
      } else if (activeObject.__proto__.type === "image") {
        $(".material-color-pane").css({ display: "block" });
        $(".circle-color-pane").css({ display: "none" });
        $(".text-color-pane").css({ display: "none" });
        $(".artwork-color-pane").css({ display: "none" });
      } else if (activeObject.__proto__.type === "circle") {
        $(".circle-color-pane").css({ display: "block" });
        $(".text-color-pane").css({ display: "none" });
        $("#custom").css("display", "none");
        $("#text-custom").css("display", "none");
        $(".advanced_span").css("display", "none");
        $(".custom-colors").css("display", "none");
        if (activeObject.get("fill") === "rgba(0,0,0,0)")
          $(".default-colors .default-color-1").css("visibility", "hidden");
        else $(".default-colors .default-color-1").css("visibility", "visible");
        $(".default-colors .default-color-3").css("visibility", "hidden");
        let selectedStrokeColor = activeObject.get("stroke");
        $("#circle-color-bind").css("background", selectedStrokeColor);
      } else if (activeObject.__proto__.type === "path-group") {
        $(".artwork-color-pane").css({ display: "block" });
        $("#artwork-custom").css({ display: "block" });
        $(".artwork-color-pane .custom-colors div.active").removeClass(
          "active"
        );
        $(".artwork-custom-color").addClass("active");
        $(".custom-colors").css("display", "block");
        $("#artwork-rgb").css({ display: "none" });
        $("#artwork-cmyk").css({ display: "none" });
        $(".circle-color-pane").css({ display: "none" });
        $(".text-color-pane").css({ display: "none" });
        const paths = activeObject.paths;
        let colors = [];
        let pathsArray = [];
        for (let i = 0; i < paths.length; i++) {
          const color = paths[i].getFill();
          const index = colors.indexOf(color);
          if (index < 0) {
            let temp = [];
            colors.push(color);
            temp.push(i);
            pathsArray.push(temp);
            $(
              `.artwork-color-pane .default-colors .default-color-${colors.length}`
            ).css("background", color);
          } else pathsArray[index].push(i);
        }
        this.props.setCurrentArtworkPath(pathsArray);
      } else {
        $(".default-color-1").css({
          background: activeObject._objects[0].get("stroke")
        });
        $(".default-color-2").css({
          background: activeObject._objects[1].get("stroke")
        });
        $(".default-color-3").css({
          background: activeObject._objects[3].get("stroke")
        });
        $(".default-colors .default-color-1").css("visibility", "visible");
        $(".default-colors .default-color-3").css("visibility", "visible");
        $(".material-color-pane").css({ display: "none" });
        $(".circle-color-pane").css({ display: "block" });
        $(".text-color-pane").css({ display: "none" });
        $("#custom").css("display", "none");
        $("#rgb").css("display", "none");
        $("#cmyk").css("display", "none");
        $("#text-custom").css("display", "none");
        $(".advanced_span").css("display", "none");
        $(".custom-colors").css("display", "none");
      }
    });

    canvas.on("selection:cleared", () => {
      $(".deleteBtn").css("visibility", "hidden");
      $(".material-color-pane").css({ display: "none" });
      $(".circle-color-pane").css({ display: "none" });
      $(".text-color-pane").css({ display: "none" });
      $(".artwork-color-pane").css({ display: "none" });
      $(".custom-colors").css("display", "none");
      $(".advanced_span").css("display", "none");
      $("#rgb").css("display", "none");
      $("#cmyk").css("display", "none");

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
      $("#selected_text").val("Your Text");
      $(".add-text-btn").text("Add Text");
    });

    canvas.on("object:added", () => {
      // if (!this.props.load_design) this.updateCanvasState()
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

    const config = this.props.wrestling_config;
    const grid = this.props.width / config.width;
    const width = grid * config.width;
    const height = grid * config.height;

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

const setDisableLoad = () => {
  return {
    type: "DISABLE_DESIGN_LOAD"
  };
};

const setWrestlingConfig = (width, height, isNewMaterial, file) => {
  const data = {
    width: width,
    height: height,
    length_unit: "METER",
    isNewMaterial: isNewMaterial,
    file: file
  };
  return {
    type: "SET_WRESTLING_CONFIG",
    _config: data
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

const setCurrentArtworkPath = paths => {
  return {
    type: "ARTWRORK_PATH",
    paths
  };
};

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    load_design: state.load_design,
    saved_id: state.saved_id,
    wrestling_config: state.wrestling_config
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
      setWrestlingConfig,
      setCurrentArtworkPath
    },
    dispatch
  );
};

const DesignCanvasState = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignCanvas);

export default DesignCanvasState;

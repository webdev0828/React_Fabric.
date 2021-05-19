import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import { Popover } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import FontFaceObserver from "fontfaceobserver";

class MatsToolbar extends React.Component {
  addNewRect = (e, type, color) => {
    const data = {
      mat_type: type,
      mat_color: color
    };
    this.props.setNewRectConfig(data);
    this.props.setDragRect(true);

    let width = 0;
    let height = 0;

    switch (type) {
      case 1:
        width = this.props.canvas_grid * 2;
        height = this.props.canvas_grid;
        break;
      case 2:
        width = this.props.canvas_grid;
        height = this.props.canvas_grid * 2;
        break;
      case 3:
        width = this.props.canvas_grid;
        height = this.props.canvas_grid;
        break;
      default:
        break;
    }

    let $img = $("<img />", {
      src: require("./../../../assets/img/" + color + "_" + type + ".jpg"),
      id: "dragged_image",
      width: width,
      height: height
    });
    $("#drag_image").html($img);

    width = $("#dragged_image").css("width");
    height = $("#dragged_image").css("height");

    const top = e.pageY - height.replace("px", "") / 2;
    const left = e.pageX - width.replace("px", "") / 2;

    $("#dragged_image").css({
      position: "fixed",
      top: top,
      left: left
    });

    let previewed_image = $("<img />", {
      src: require("./../../../assets/img/preview.png"),
      id: "previewed_image",
      width: width,
      height: height
    });
    $("#preview_image").html(previewed_image);

    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
  };
  render() {
    return (
      <>
        <div className="adddiv">
          <h2>Mats</h2>
        </div>
        <div className="matlist_main">
          <ul className="matlistul">
            <li>
              <span className="mat-caption">Royal Blue</span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/blue_1.jpg")}
                  alt="Royal Blue"
                  onClick={e => this.addNewRect(e, 1, "blue")}
                />
                <img
                  src={require("./../../../assets/img/blue_2.jpg")}
                  alt="Royal Blue"
                  onClick={e => this.addNewRect(e, 2, "blue")}
                />
                <img
                  src={require("./../../../assets/img/blue_3.jpg")}
                  alt="Royal Blue"
                  onClick={e => this.addNewRect(e, 3, "blue")}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Red</span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/red_1.jpg")}
                  alt="RED"
                  onClick={e => this.addNewRect(e, 1, "red")}
                />
                <img
                  src={require("./../../../assets/img/red_2.jpg")}
                  alt="RED"
                  onClick={e => this.addNewRect(e, 2, "red")}
                />
                <img
                  src={require("./../../../assets/img/red_3.jpg")}
                  alt="RED"
                  onClick={e => this.addNewRect(e, 3, "red")}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Gold</span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/gold_1.jpg")}
                  alt="Gold"
                  onClick={e => this.addNewRect(e, 1, "gold")}
                />
                <img
                  src={require("./../../../assets/img/gold_2.jpg")}
                  alt="Gold"
                  onClick={e => this.addNewRect(e, 2, "gold")}
                />
                <img
                  src={require("./../../../assets/img/gold_3.jpg")}
                  alt="Gold"
                  onClick={e => this.addNewRect(e, 3, "gold")}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Black</span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/black_1.jpg")}
                  alt="Black"
                  onClick={e => this.addNewRect(e, 1, "black")}
                />
                <img
                  src={require("./../../../assets/img/black_2.jpg")}
                  alt="Black"
                  onClick={e => this.addNewRect(e, 2, "black")}
                />
                <img
                  src={require("./../../../assets/img/black_3.jpg")}
                  alt="Black"
                  onClick={e => this.addNewRect(e, 3, "black")}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption">Gray</span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/gray_1.jpg")}
                  alt="Grey"
                  onClick={e => this.addNewRect(e, 1, "gray")}
                />
                <img
                  src={require("./../../../assets/img/gray_2.jpg")}
                  alt="Grey"
                  onClick={e => this.addNewRect(e, 2, "gray")}
                />
                <img
                  src={require("./../../../assets/img/gray_3.jpg")}
                  alt="Grey"
                  onClick={e => this.addNewRect(e, 3, "gray")}
                />
              </span>
            </li>
            <li>
              <span className="mat-caption" style={{ textAlign: "left" }}>
                Light Green
              </span>
              <span className="mat-images">
                <img
                  src={require("./../../../assets/img/lightgreen_1.jpg")}
                  alt="Green"
                  onClick={e => this.addNewRect(e, 1, "lightgreen")}
                />
                <img
                  src={require("./../../../assets/img/lightgreen_2.jpg")}
                  alt="Green"
                  onClick={e => this.addNewRect(e, 2, "lightgreen")}
                />
                <img
                  src={require("./../../../assets/img/lightgreen_3.jpg")}
                  alt="Green"
                  onClick={e => this.addNewRect(e, 3, "lightgreen")}
                />
              </span>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

const setNewRectConfig = data => {
  return {
    type: "NEW_RECT_CONFIG",
    data: data
  };
};

const setDragRect = drag_new_rect => {
  return {
    type: "DRAG_NEW_RECT",
    drag_new_rect: drag_new_rect
  };
};

const mapStateToProps = state => {
  return {
    components: [...state.components],
    _config: state._config,
    canvas: state.canvas,
    canvas_grid: state.canvas_grid,
    templates: state.templates,
    logo_url: state.logo_url,
    templates_width: state.templates_width
  };
};

const mapDispatchToPropsForRect = dispatch => {
  return bindActionCreators({ setNewRectConfig, setDragRect }, dispatch);
};

const MatsToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect
)(MatsToolbar);

class MatsToolSidebar extends React.Component {
  closeNav1 = () => {
    document.getElementById("mySidenav1").style.width = "0";
  };

  render() {
    return (
      <>
        <div id="mats" className="h100 second-menu fordeskview">
          <MatsToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav1 formobview wo"
          id="mySidenav1"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav1()}
          >
            &times;
          </a>
          <MatsToolbarConnect />
        </div>
      </>
    );
  }
}

class TemplatesToolbar extends React.Component {
  addNewTemplate = e => {
    let template_type = e.target.alt;
    this.props.setNewTemplateConfig(template_type);
    this.props.setDragTemplate(true);
    const templates_width = this.props.templates_width;
    const width = templates_width[template_type].width * this.props.canvas_grid;
    const height =
      templates_width[template_type].height * this.props.canvas_grid;
    let img_template = $("<img />", {
      src: require("./../../../assets/img/" + template_type + ".jpg"),
      id: "dragged_template",
      width,
      height,
      display: "none"
    });
    $("#drag_template").html(img_template);

    let previewed_image = $("<img />", {
      src: require("./../../../assets/img/preview.png"),
      id: "previewed_image",
      width: width,
      height: height
    });
    $("#preview_image").html(previewed_image);

    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
  };
  render() {
    return (
      <>
        <div className="adddiv">
          <h2>Templates</h2>
        </div>
        <div className="templatesmain" style={{ height: 550 }}>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template1.jpg")}
                alt="template1"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template2.jpg")}
                alt="template2"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template3.jpg")}
                alt="template3"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template4.jpg")}
                alt="template4"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template5.jpg")}
                alt="template5"
                onClick={this.addNewTemplate}
                style={{ width: "230px" }}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template15.jpg")}
                alt="template15"
                onClick={this.addNewTemplate}
                style={{ width: "230px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template6.jpg")}
                alt="template6"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template7.jpg")}
                alt="template7"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template8.jpg")}
                alt="template8"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template9.jpg")}
                alt="template9"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template10.jpg")}
                alt="template10"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template11.jpg")}
                alt="template11"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template12.jpg")}
                alt="template12"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template13.jpg")}
                alt="template13"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="temrows">
              <img
                src={require("./../../../assets/img/template14.jpg")}
                alt="template14"
                onClick={this.addNewTemplate}
                style={{ width: "121px", height: "121px" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const setDragTemplate = drag_new_template => {
  return {
    type: "DRAG_NEW_TEMPLATE",
    drag_new_template: drag_new_template
  };
};

const setNewTemplateConfig = template_type => {
  return {
    type: "NEW_TEMPLATE_CONFIG",
    template_type: template_type
  };
};

const mapDispatchToPropsForTemplate = dispatch => {
  return bindActionCreators(
    { setNewTemplateConfig, setDragTemplate },
    dispatch
  );
};

const TemplatesToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForTemplate
)(TemplatesToolbar);

class TemplateToolSidebar extends React.Component {
  closeNav2 = () => {
    document.getElementById("mySidenav2").style.width = "0";
  };

  render() {
    return (
      <>
        <div
          id="template"
          className="h100 second-menu fordeskview"
          style={{ display: "none" }}
        >
          <TemplatesToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav2 formobview wo"
          id="mySidenav2"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav2()}
          >
            &times;
          </a>
          <TemplatesToolbarConnect />
        </div>
      </>
    );
  }
}

const TextStyle = props => {
  return (
    <>
      <div id="text-style" className="row">
        <div
          id="text-style-1"
          className="col-md-6 col-sm-12 text-style_1"
          onClick={() => props.setTextArcStyle("text-style-1")}
        >
          <img
            src={require("./../../../assets/img/text-style_1.png")}
            alt="style_1"
            onClick={() => props.setTextArcStyle("text-style-1")}
          />
        </div>
        <div
          id="text-style-2"
          className="col-md-6 col-sm-12 text-style_2"
          onClick={() => props.setTextArcStyle("text-style-2")}
        >
          <img
            src={require("./../../../assets/img/text-style_2.png")}
            alt="style_2"
            onClick={() => props.setTextArcStyle("text-style-2")}
          />
        </div>
      </div>
      <div id="text-style" className="row">
        <div
          id="text-style-3"
          className="col-md-6 col-sm-12 text-style_3"
          onClick={() => props.setTextArcStyle("text-style-3")}
        >
          <img
            src={require("./../../../assets/img/text-style_3.png")}
            alt="style_3"
            onClick={() => props.setTextArcStyle("text-style-3")}
          />
        </div>
        <div
          id="text-style-4"
          className="col-md-6 col-sm-12 text-style_4"
          onClick={() => props.setTextArcStyle("text-style-4")}
        >
          <img
            src={require("./../../../assets/img/text-style_4.png")}
            alt="style_4"
            onClick={() => props.setTextArcStyle("text-style-4")}
          />
        </div>
      </div>
    </>
  );
};

class TextToolbar extends React.Component {
  addNewText = () => {
    let new_text = $("#selected_text").val();
    if (new_text === "") {
      alert("Please input the text");
      return;
    }
    let text = this.props.canvas._objects[0];
    let activeObject = this.props.canvas._activeObject;
    if (activeObject) {
      activeObject.setText(new_text);
      this.props.canvas.renderAll();
      this.updateCanvasState();
    } else {
      let data = {
        text: "Your Text",
        top: text.top,
        left: text.left,
        fontSize: 20,
        fontWeight: text.get("fontWeight"),
        fontStyle: text.get("fontStyle"),
        textDecoration: text.get("textDecoration"),
        lineHeight: text.get("lineHeight"),
        fill: text.get("fill"),
        strokeWidth: text.get("strokeWidth") / 1,
        stroke: text.get("stroke"),
        letterSpace: text.letterSpace,
        effect: "STRAIGHT"
      };

      this.props.setCurvedTextStyle(data);
      var curvedText = new window.fabric.CurvedText("Your Text", data);
      this.props.addNewCurvedText(curvedText, data);
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

  setTextStyle = id => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    let targetClsName = $("#" + id).attr("class");
    const textStyleOption = id;
    if (targetClsName.indexOf("active") > -1) {
      $("#" + id).removeClass("active");
      switch (textStyleOption) {
        case "bold":
          activeObject.set("fontWeight", "normal");
          break;
        case "italic":
          activeObject.set("fontStyle", "");
          break;
        case "underline":
          activeObject.set("textDecoration", "");
          break;
        case "capital":
          activeObject.text = activeObject.text.toLowerCase();
          break;
        case "left-align":
        case "center-align":
        case "right-align":
          activeObject.set("textAlign", "left");
          break;
        default:
          break;
      }
    } else {
      $("#" + id).addClass("active");
      switch (textStyleOption) {
        case "bold":
          activeObject.set("fontWeight", "bold");
          break;
        case "italic":
          activeObject.set("fontStyle", "italic");
          break;
        case "underline":
          activeObject.set("textDecoration", "underline");
          break;
        case "capital":
          activeObject.text = activeObject.text.toUpperCase();
          break;
        case "left-align":
          activeObject.set("textAlign", "left");
          $("#center-align").removeClass("active");
          $("#right-align").removeClass("active");
          break;
        case "center-align":
          activeObject.set("textAlign", "center");
          $("#left-align").removeClass("active");
          $("#right-align").removeClass("active");
          break;
        case "right-align":
          activeObject.set("textAlign", "right");
          $("#center-align").removeClass("active");
          $("#left-align").removeClass("active");
          break;
        default:
          break;
      }
    }
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setFontSize = e => {
    let { value } = e.target;

    let fontSize = value.replace("px", "");

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("fontSize", fontSize);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setLineHeight = e => {
    let { value } = e.target;
    $("#line_ht_get").val(value);
    $("#line_ht_set").val(value);

    $("#line_ht_get").css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value *
        9}%, #fff ${value * 9}%, #fff 100%)`
    });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("lineHeight", value);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  bindTextColorBtn = () => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    $(".material-color-pane").css({ display: "none" });
    $(".circle-color-pane").css({ display: "none" });
    $(".text-color-pane").css({ display: "block" });
    $(".advanced_span").css({ display: "block" });
    $(".custom-colors").css({ display: "block" });
    $("#text-custom").css({ display: "block" });
    $(".custom-colors div.active").removeClass("active");
    $(".text-custom-color").addClass("active");
    $("#text-rgb").css({ display: "none" });
    $("#text-cmyk").css({ display: "none" });
    this.props.setTextColorOption("fill");
  };

  setTextColor = e => {
    let { value } = e.target;
    $("#text-color-bind").css({ background: value });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("fill", value);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setOutlineSize = e => {
    let { value } = e.target;

    $("#size_get").val(value);
    $("#size_set").val(value);

    $("#size_get").css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value *
        10}%, #fff ${value * 10}%, #fff 100%)`
    });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("strokeWidth", value / 1);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  bindOutlineColorBtn = () => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    $(".material-color-pane").css({ display: "none" });
    $(".circle-color-pane").css({ display: "none" });
    $(".text-color-pane").css({ display: "block" });
    $(".advanced_span").css({ display: "block" });
    $(".custom-colors").css({ display: "block" });
    $("#text-custom").css({ display: "block" });
    $(".custom-colors div.active").removeClass("active");
    $(".text-custom-color").addClass("active");
    $("#text-rgb").css({ display: "none" });
    $("#text-cmyk").css({ display: "none" });
    this.props.setTextColorOption("stroke");
  };

  setOutlineColor = e => {
    let { value } = e.target;
    $("#outline-color-bind").css({ background: value });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("stroke", value);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setTextArcStyle = text_arc_style => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    switch (text_arc_style) {
      case "text-style-1":
        if (activeObject.radius !== undefined) {
          activeObject.set("effect", "vertical");
          this.props.canvas.renderAll();
          this.updateCanvasState();
        } else {
          let data = {
            text: activeObject.text,
            top: activeObject.top,
            left: activeObject.left,
            fontSize: activeObject.get("fontSize"),
            fontWeight: activeObject.get("fontWeight"),
            fontStyle: activeObject.get("fontStyle"),
            textDecoration: activeObject.get("textDecoration"),
            lineHeight: activeObject.get("lineHeight"),
            fill: activeObject.get("fill"),
            strokeWidth: activeObject.get("strokeWidth") / 1,
            stroke: activeObject.get("stroke"),
            letterSpace: activeObject.letterSpace,
            effect: "vertical"
          };

          this.props.canvas.remove(activeObject);
          this.props.setComponentType("VerticalText");
          this.props.setCurvedTextStyle(data);
        }
        break;
      case "text-style-2":
        if (activeObject.radius !== undefined) {
          activeObject.set("effect", "curved");
          this.props.canvas.renderAll();
          this.updateCanvasState();
        } else {
          let data = {
            text: activeObject.text,
            top: activeObject.top,
            left: activeObject.left,
            fontSize: activeObject.get("fontSize"),
            fontWeight: activeObject.get("fontWeight"),
            fontStyle: activeObject.get("fontStyle"),
            textDecoration: activeObject.get("textDecoration"),
            lineHeight: activeObject.get("lineHeight"),
            fill: activeObject.get("fill"),
            strokeWidth: activeObject.get("strokeWidth") / 1,
            stroke: activeObject.get("stroke"),
            letterSpace: activeObject.letterSpace,
            effect: "curved"
          };

          this.props.canvas.remove(activeObject);
          this.props.setComponentType("Curvedtext");
          this.props.setCurvedTextStyle(data);
        }
        break;
      case "text-style-3":
        if (activeObject.radius !== undefined) {
          activeObject.set("effect", "arc");
          this.props.canvas.renderAll();
          this.updateCanvasState();
        } else {
          let data = {
            text: activeObject.text,
            top: activeObject.top,
            left: activeObject.left,
            fontSize: activeObject.get("fontSize"),
            fontWeight: activeObject.get("fontWeight"),
            fontStyle: activeObject.get("fontStyle"),
            textDecoration: activeObject.get("textDecoration"),
            lineHeight: activeObject.get("lineHeight"),
            fill: activeObject.get("fill"),
            strokeWidth: activeObject.get("strokeWidth") / 1,
            stroke: activeObject.get("stroke"),
            letterSpace: activeObject.letterSpace,
            effect: "arc"
          };

          this.props.canvas.remove(activeObject);
          this.props.setComponentType("Curvedtext");
          this.props.setCurvedTextStyle(data);
        }
        break;
      case "text-style-4":
        if (activeObject.radius !== undefined) {
          activeObject.set("effect", "flag");
          this.props.canvas.renderAll();
          this.updateCanvasState();
        } else {
          let data = {
            text: activeObject.text,
            top: activeObject.top,
            left: activeObject.left,
            fontSize: activeObject.get("fontSize"),
            fontWeight: activeObject.get("fontWeight"),
            fontStyle: activeObject.get("fontStyle"),
            textDecoration: activeObject.get("textDecoration"),
            lineHeight: activeObject.get("lineHeight"),
            fill: activeObject.get("fill"),
            strokeWidth: activeObject.get("strokeWidth") / 1,
            stroke: activeObject.get("stroke"),
            letterSpace: activeObject.letterSpace,
            effect: "flag"
          };

          this.props.canvas.remove(activeObject);
          this.props.setComponentType("FlagText");
          this.props.setCurvedTextStyle(data);
        }
        break;
      default:
        break;
    }
  };

  setLetterSpace = e => {
    let { value } = e.target;
    $("#spacing_get").val(value);
    $("#spacing_set").val(value);

    $("#spacing_get").css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value}%, #fff ${value}%, #fff 100%)`
    });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("spacing", value);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setFontFamily = e => {
    let { value } = e.target;

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    let font = new FontFaceObserver(value);
    font
      .load()
      .then(() => {
        activeObject.set("fontFamily", value);
        this.props.canvas.renderAll();
      })
      .catch(e => {});

    this.updateCanvasState();
  };

  setRadius = e => {
    let { value } = e.target;
    $("#arc_get").val(value);
    $("#arc_set").val(value);

    $("#arc_get").css({
      background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${value *
        2}%, #fff ${value}%, #fff 100%)`
    });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    if (
      activeObject.effect === "arc" ||
      activeObject.effect === "flag" ||
      activeObject.effect === "curved"
    ) {
      activeObject.set("radius", 500 - (20 * value) / 1);
      this.props.canvas.renderAll();
      this.updateCanvasState();
    }
  };

  render() {
    return (
      <>
        <div className="adddiv">
          <h2>Add Text</h2>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row row-border-btm">
                <div className="col-md-8 vrtcl-dot-line">
                  <div className="form-group">
                    <select
                      className="form-control slct-font-fam"
                      onChange={this.setFontFamily}
                    >
                      <option>Times New Roman</option>
                      <option>Army</option>
                      <option>Celtic</option>
                      <option>Martel</option>
                      <option>FM College Team Outline</option>
                      <option>FM College Team</option>
                      <option>lvy League</option>
                      <option>lvy League Outline</option>
                      <option>Babylon5 Credits</option>
                      <option>Blackjack</option>
                      <option>Old Gondor</option>
                      <option>Ball Park</option>
                      <option>Trebuchet MS</option>
                      <option>Century Gothic</option>
                      <option>Major Snafu</option>
                      <option>Stencil Becker Solid</option>
                      <option>Freshman</option>
                      <option>InterState</option>
                      <option>Machine BT</option>
                      <option>Rockwell Condensed</option>
                      <option>Rockwell</option>
                      <option>Times New Roman</option>
                      <option>Yearbook Solid</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <select
                      className="form-control slct-font-size"
                      onChange={this.setFontSize}
                    >
                      <option val="20">20px</option>
                      <option val="22">22px</option>
                      <option val="24">24px</option>
                      <option val="26">26px</option>
                      <option val="28">28px</option>
                      <option val="30">30px</option>
                      <option val="32">32px</option>
                      <option val="34">34px</option>
                      <option val="36">36px</option>
                      <option val="38">38px</option>
                      <option val="40">40px</option>
                      <option val="42">42px</option>
                      <option val="44">44px</option>
                      <option val="46">46px</option>
                      <option val="48">48px</option>
                      <option val="50">50px</option>
                      <option val="52">52px</option>
                      <option val="54">54px</option>
                      <option val="56">56px</option>
                      <option val="58">58px</option>
                      <option val="60">60px</option>
                      <option val="62">62px</option>
                      <option val="64">64px</option>
                      <option val="66">66px</option>
                      <option val="68">68px</option>
                      <option val="70">70px</option>
                      <option val="72">72px</option>
                      <option val="74">74px</option>
                      <option val="76">76px</option>
                      <option val="78">78px</option>
                      <option val="80">80px</option>
                      <option val="85">85px</option>
                      <option val="90">90px</option>
                      <option val="95">95px</option>
                      <option val="100">100px</option>
                      <option val="110">110px</option>
                      <option val="120">120px</option>
                      <option val="130">130px</option>
                      <option val="140">140px</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row row-border-btm pt-15 pb-15">
                <div className="col-md-7 vrtcl-dot-line">
                  <div className="font-stl-blk">
                    <button
                      id="bold"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("bold")}
                    >
                      B
                    </button>
                    <button
                      id="italic"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("italic")}
                    >
                      <i>I</i>
                    </button>
                    <button
                      id="underline"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("underline")}
                    >
                      <span>U</span>
                    </button>
                    <button
                      id="capital"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("capital")}
                    >
                      AA
                    </button>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="font-stl-blk">
                    <button
                      id="left-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("left-align")}
                    ></button>
                    <button
                      id="center-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("center-align")}
                    ></button>
                    <button
                      id="right-align"
                      className="btn stl-btn"
                      onClick={() => this.setTextStyle("right-align")}
                    ></button>
                  </div>
                </div>
              </div>
              <div className="row pt-15 pb-15">
                <div className="col-md-12">
                  <div className="line-height-blk">
                    <div className="line-height-label">
                      <span>Line height</span>
                    </div>
                    <div className="line-height-label">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="1"
                          className="range-slider"
                          id="line_ht_get"
                          onChange={this.setLineHeight}
                        ></input>
                      </div>
                    </div>
                    <div className="line-height-value">
                      <input
                        type="number"
                        id="line_ht_set"
                        className="btn ln-ht-val-btn"
                        defaultValue="1"
                        min="1"
                        max="10"
                        onChange={this.setLineHeight}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="spacing-blk pt-10">
                    <div className="spacing-label">
                      <span>Spacing</span>
                    </div>
                    <div className="spacing-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          defaultValue="1"
                          className="range-slider"
                          id="spacing_get"
                          onChange={this.setLetterSpace}
                        ></input>
                      </div>
                    </div>
                    <div className="spacing-value">
                      <input
                        type="number"
                        id="spacing_set"
                        min="1"
                        max="100"
                        className="btn spacing-val-btn"
                        defaultValue="1"
                        onChange={this.setLetterSpace}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="choose-clr-blk pt-10">
                    <div className="choos-clr-label">
                      <span>Choose Color</span>
                    </div>
                    <div className="choos-clr-btn">
                      <button
                        id="text-color-bind"
                        className="btn"
                        onClick={() => this.bindTextColorBtn()}
                      ></button>
                      <input
                        type="color"
                        id="text-color"
                        className="btn"
                        defaultValue="black"
                        onChange={this.setTextColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="outline-blk pt-15">
            <h2>ADD OUTLINE</h2>
          </div>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row">
                <div className="col-md-12">
                  <div className="size-blk pt-10">
                    <div className="size-label">
                      <span>Size</span>
                    </div>
                    <div className="size-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="1"
                          className="range-slider"
                          id="size_get"
                          onChange={this.setOutlineSize}
                        ></input>
                      </div>
                    </div>
                    <div className="size-value">
                      <input
                        type="number"
                        id="size_set"
                        className="btn size-val-btn"
                        min="1"
                        max="10"
                        defaultValue="1"
                        onChange={this.setOutlineSize}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="choose-clr-blk pt-10">
                    <div className="choos-clr-label">
                      <span>Choose Color</span>
                    </div>
                    <div className="choos-clr-btn">
                      <button
                        id="outline-color-bind"
                        className="btn"
                        onClick={() => this.bindOutlineColorBtn()}
                      ></button>
                      <input
                        type="color"
                        id="outline-color"
                        className="btn"
                        onChange={this.setOutlineColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-blk">
            <h2>ADD SHAPE</h2>
          </div>
          <div className="add-text-blk-hmenu">
            <div className="font-select">
              <div className="row">
                <div className="col-md-12">
                  <div className="font-stl-blk pt-10">
                    <div className="choos-clr-label float-left">
                      <span>Font Style</span>
                    </div>
                    <div className="choose-button-blk float-right">
                      <Popover
                        placement="right"
                        content={
                          <TextStyle setTextArcStyle={this.setTextArcStyle} />
                        }
                        trigger="click"
                      >
                        <button className="btn choose-btn">CHOOSE </button>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="arc-blk pt-10">
                    <div className="arc-label">
                      <span>Arc</span>
                    </div>
                    <div className="arc-slider">
                      <div className="range-slidecontainer">
                        <input
                          type="range"
                          min="1"
                          max="50"
                          defaultValue="1"
                          className="range-slider"
                          id="arc_get"
                          onChange={this.setRadius}
                        />
                      </div>
                    </div>
                    <div className="arc-value">
                      <input
                        type="number"
                        id="arc_set"
                        min="1"
                        max="50"
                        className="btn size-val-btn"
                        defaultValue="1"
                        onChange={this.setRadius}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="add-new-txt">
            <div className="row ">
              <div className="col-md-12">
                <div className="pt-10" style={{ display: "inline-flex" }}>
                  <div className="new-text-input">
                    <input
                      type="text"
                      id="selected_text"
                      defaultValue="Your Text"
                    ></input>
                  </div>
                  <div className="new-text-input">
                    <button
                      className="btn green-btn btn-success add-text-btn"
                      onClick={() => this.addNewText()}
                    >
                      Add Text
                    </button>
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

const addNewCurvedText = (curvedText, data) => {
  return {
    type: "NEW_CURVED_TEXT",
    component: curvedText,
    data: data
  };
};

const setCurvedTextStyle = data => {
  return {
    type: "SET_CURVEDTEXT_STLYE",
    data: data
  };
};

const setCanvasConfig = _config => {
  return {
    type: "SET_CONFIG",
    _config
  };
};

const setLetterSpacingOption = option => {
  return {
    type: "SET_LETTER_SPACING_OPTION",
    option: option
  };
};

const setSelectedText = text => {
  return {
    type: "SET_SELECTED_TEXT",
    text: text
  };
};

const setTextColorOption = option => {
  return {
    type: "SET_TEXT_COLOR_OPTION",
    option
  };
};

const mapDispatchToPropsForText = dispatch => {
  return bindActionCreators(
    {
      addNewCurvedText,
      setCurvedTextStyle,
      setCanvasConfig,
      setLetterSpacingOption,
      setSelectedText,
      setTextColorOption
    },
    dispatch
  );
};

const TextToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForText
)(TextToolbar);

class TextToolSidebar extends React.Component {
  closeNav3 = () => {
    document.getElementById("mySidenav3").style.width = "0";
  };

  render() {
    return (
      <>
        <div
          id="text"
          className="h100 second-menu fordeskview"
          style={{ display: "none" }}
        >
          <TextToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav3 formobview wo"
          id="mySidenav3"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav3()}
          >
            &times;
          </a>
          <TextToolbarConnect />
        </div>
      </>
    );
  }
}

const ImageList = props => {
  const files = props.files;
  if (files.length <= 0) return <div />;
  else
    return files.map((file, idx) => (
      <div className="col-md-4" key={`div_${idx}`}>
        <img
          src={require(`./../../../../icons/${file}`)}
          alt=""
          key={idx}
          onClick={props.addNewLogo}
        />
      </div>
    ));
};
class LogoToolbar extends React.Component {
  state = {
    files: []
  };

  componentDidMount = () => {
    axios
      .post("http://localhost:3001/logo_images")
      .then(res => {
        this.setState({ files: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  bindFileExplorer = () => {
    $("#customFile").click();
  };

  onChangeHandler = e => {
    let formData = new FormData();

    const files = Array.from(e.target.files);
    files.forEach(file => {
      formData.append("file", file);
    });

    axios
      .post("http://localhost:3001/upload_images", formData)
      .then(res => {
        setTimeout(() => {
          axios
            .post("http://localhost:3001/logo_images")
            .then(res => {
              this.setState({ files: res.data });
            })
            .catch(err => {
              console.log(err);
            });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  addNewLogo = e => {
    let { src } = e.target;
    this.props.setImageUrl(src);
    window.fabric.Image.fromURL(
      require("./../../../assets/img/profile.jpg"),
      image => {
        image.scale(0.5);
        image.set({
          left: 0,
          top: 0,
          hoverCursor: "default"
        });

        this.props.addNewImage(image);
      }
    );
  };

  render() {
    const files = this.state.files;
    return (
      <>
        <div className="row adddiv">
          <h2>Add Logo</h2>
          <p
            onClick={() => this.bindFileExplorer()}
            style={{ cursor: "pointer" }}
          >
            Upload your own images from computer
          </p>
          <input
            type="file"
            multiple
            className="custom-file-input"
            id="customFile"
            name="files"
            onChange={this.onChangeHandler}
          />
          <small>
            <i>Accepted Files : SVG, JPG, JPEG, PNG</i>
          </small>
        </div>
        <div className="row image_list">
          <ImageList files={files} addNewLogo={this.addNewLogo} />
        </div>
      </>
    );
  }
}

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

const mapDispatchToPropsForLogo = dispatch => {
  return bindActionCreators({ setImageUrl, addNewImage }, dispatch);
};

const LogoToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForLogo
)(LogoToolbar);

class LogoToolSidebar extends React.Component {
  closeNav4 = () => {
    document.getElementById("mySidenav4").style.width = "0";
  };

  render() {
    return (
      <>
        <div
          id="logo"
          className="h100 second-menu fordeskview"
          style={{ display: "none" }}
        >
          <LogoToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav4 formobview wo"
          id="mySidenav4"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav4()}
          >
            &times;
          </a>
          <LogoToolbarConnect />
        </div>
      </>
    );
  }
}

class SidebarItemsDesktop extends React.Component {
  render() {
    return (
      <>
        <MatsToolSidebar />
        <TemplateToolSidebar />
        <TextToolSidebar />
        <LogoToolSidebar />
      </>
    );
  }
}

export default SidebarItemsDesktop;

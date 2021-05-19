import React from "react";
import "../assets/css/bootstrap.css";
import "../assets/css/fontawesome.css";
import "../assets/css/wrestling.css";
import "../assets/css/metisMenu.css";
import "../assets/css/onoffcanvas.css";
import "../assets/css/animate.css";
import { Container } from "shards-react";
import "fabric-webpack";
import DesignCanvas from "../components/layout/wrestling_mat_designer/DesignCanvas";
import { connect } from "react-redux";
import CurvedText from "../components/CurvedText";
import Image from "../components/Image";
import {
  Circle1,
  Circle2,
  Circle3,
  Circle4,
  Circle5,
  Circle6,
  Circle7,
  Circle8
} from "../components/Circles";
import Artwork from "../components/Artwork";
import { bindActionCreators } from "redux";
import Sidebar from "../components/layout/wrestling_mat_designer/Sidebar";
import Toolbar from "../components/layout/wrestling_mat_designer/Toolbar";
import ExtraMenu from "../components/layout/wrestling_mat_designer/ExtraMenu";
import SidebarItems from "../components/layout/wrestling_mat_designer/SidebarItems";
import $ from "jquery";
import ColorPickerContainer from "./../components/ColorPicker";
import QuoteModal from "./../components/layout/QuoteModal";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    id: null
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.props.setSaveDesignID(id);
    }
    $(".circle-color-pane").css({ display: "none" });
    $(".text-color-pane").css({ display: "none" });
    $(".artwork-color-pane").css({ display: "none" });
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

  showEditArtWorkDialogue = () => {
    $(".material-color-pane").css({ display: "none" });
    $(".circle-color-pane").css({ display: "none" });
    $(".text-color-pane").css({ display: "none" });
  };

  setArtWorkColor = color => {
    let activeObject = this.props.canvas._activeObject;
    activeObject.set("fill", color);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  deleteSelectedMaterial = () => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject) {
      this.props.canvas.remove(activeObject);
    }
    this.updateCanvasState();
  };

  duplicateSelectedMaterial = () => {
    let activeObject = this.props.canvas._activeObject;
    activeObject.clone(cloned => {
      this.props.canvas.add(cloned);
    });
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  clearCanvas = e => {
    e.preventDefault();
    this.props.canvas.clear();
    this.updateCanvasState();
    this.props.clearCanvas();
  };

  setKeyColor = e => {
    let { value } = e.target;
    $("#key_get").val(value);
    $("#key_set").val(value);
    const black = value;
    const cyan = $("#cyan_get").val();
    const magenta = $("#magenta_get").val();
    const yellow = $("#yellow_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (activeObject.__proto__.type === "group") {
      switch (this.props.selectedGroupType) {
        case 0:
          activeObject._objects[1].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          activeObject._objects[3].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 1:
          activeObject._objects[0].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 2:
          activeObject._objects[2].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-3").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        default:
          break;
      }
    } else if (activeObject.__proto__.type === "path-group") {
      for (let i = 0; i < activeObject.paths.length; i++) {
        let index = this.props.artworkPaths[
          this.props.selectedGroupType
        ].indexOf(i);
        if (index >= 0)
          activeObject.paths[i].setFill(`rgb(${red}, ${green}, ${blue})`);
      }
      $(
        `.artwork-color-pane .default-colors .default-color-${this.props
          .selectedGroupType + 1}`
      ).css("background", `rgb(${red}, ${green}, ${blue})`);
    } else {
      if (activeObject.get("fill") === "rgba(0,0,0,0)") {
        activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
        $(".circle-color-pane .default-color-2").css(
          "background",
          `rgb(${red}, ${green}, ${blue})`
        );
      } else {
        if (this.props.selectedGroupType === 0) {
          activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        } else if (this.props.selectedGroupType === 1) {
          activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        }
      }
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setMagentaColor = e => {
    let { value } = e.target;
    $("#magenta_get").val(value);
    $("#magenta_set").val(value);

    const magenta = value;
    const cyan = $("#cyan_get").val();
    const black = $("#key_get").val();
    const yellow = $("#yellow_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (activeObject.__proto__.type === "group") {
      switch (this.props.selectedGroupType) {
        case 0:
          activeObject._objects[0].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          activeObject._objects[2].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 1:
          activeObject._objects[1].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 2:
          activeObject._objects[3].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-3").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        default:
          break;
      }
    } else if (activeObject.__proto__.type === "path-group") {
      for (let i = 0; i < activeObject.paths.length; i++) {
        let index = this.props.artworkPaths[
          this.props.selectedGroupType
        ].indexOf(i);
        if (index >= 0)
          activeObject.paths[i].setFill(`rgb(${red}, ${green}, ${blue})`);
      }
      $(
        `.artwork-color-pane .default-colors .default-color-${this.props
          .selectedGroupType + 1}`
      ).css("background", `rgb(${red}, ${green}, ${blue})`);
    } else {
      if (activeObject.get("fill") === "rgba(0,0,0,0)") {
        activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
        $(".circle-color-pane .default-color-2").css(
          "background",
          `rgb(${red}, ${green}, ${blue})`
        );
      } else {
        if (this.props.selectedGroupType === 0) {
          activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        } else if (this.props.selectedGroupType === 1) {
          activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        }
      }
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setYellowColor = e => {
    let { value } = e.target;
    $("#yellow_get").val(value);
    $("#yellow_set").val(value);

    const yellow = value;
    const cyan = $("#cyan_get").val();
    const black = $("#key_get").val();
    const magenta = $("#magenta_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (activeObject.__proto__.type === "group") {
      switch (this.props.selectedGroupType) {
        case 0:
          activeObject._objects[0].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          activeObject._objects[2].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 1:
          activeObject._objects[1].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 2:
          activeObject._objects[3].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-3").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        default:
          break;
      }
    } else if (activeObject.__proto__.type === "path-group") {
      for (let i = 0; i < activeObject.paths.length; i++) {
        let index = this.props.artworkPaths[
          this.props.selectedGroupType
        ].indexOf(i);
        if (index >= 0)
          activeObject.paths[i].setFill(`rgb(${red}, ${green}, ${blue})`);
      }
      $(
        `.artwork-color-pane .default-colors .default-color-${this.props
          .selectedGroupType + 1}`
      ).css("background", `rgb(${red}, ${green}, ${blue})`);
    } else {
      if (activeObject.get("fill") === "rgba(0,0,0,0)") {
        activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
        $(".circle-color-pane .default-color-2").css(
          "background",
          `rgb(${red}, ${green}, ${blue})`
        );
      } else {
        if (this.props.selectedGroupType === 0) {
          activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        } else if (this.props.selectedGroupType === 1) {
          activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        }
      }
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setCyanColor = e => {
    let { value } = e.target;
    $("#cyan_get").val(value);
    $("#cyan_set").val(value);

    const cyan = value;
    const yellow = $("#yellow_get").val();
    const black = $("#key_get").val();
    const magenta = $("#magenta_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;

    if (activeObject.__proto__.type === "group") {
      switch (this.props.selectedGroupType) {
        case 0:
          activeObject._objects[0].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          activeObject._objects[2].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 1:
          activeObject._objects[1].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        case 2:
          activeObject._objects[3].set(
            "stroke",
            `rgb(${red}, ${green}, ${blue})`
          );
          $(".default-color-3").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
          break;
        default:
          break;
      }
    } else if (activeObject.__proto__.type === "path-group") {
      for (let i = 0; i < activeObject.paths.length; i++) {
        let index = this.props.artworkPaths[
          this.props.selectedGroupType
        ].indexOf(i);
        if (index >= 0)
          activeObject.paths[i].setFill(`rgb(${red}, ${green}, ${blue})`);
      }
      $(
        `.artwork-color-pane .default-colors .default-color-${this.props
          .selectedGroupType + 1}`
      ).css("background", `rgb(${red}, ${green}, ${blue})`);
    } else {
      if (activeObject.get("fill") === "rgba(0,0,0,0)") {
        activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
        $(".circle-color-pane .default-color-2").css(
          "background",
          `rgb(${red}, ${green}, ${blue})`
        );
      } else {
        if (this.props.selectedGroupType === 0) {
          activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-1").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        } else if (this.props.selectedGroupType === 1) {
          activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
          $(".circle-color-pane .default-color-2").css(
            "background",
            `rgb(${red}, ${green}, ${blue})`
          );
        }
      }
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setActiveTab = id => {
    $("#custom").css("display", "none");
    $("#rgb").css("display", "none");
    $("#cmyk").css("display", "none");
    $("#text-custom").css("display", "none");
    $("#text-rgb").css("display", "none");
    $("#text-cmyk").css("display", "none");
    $("#circle-custom").css("display", "none");
    $("#circle-rgb").css("display", "none");
    $("#circle-cmyk").css("display", "none");
    $("#artwork-custom").css("display", "none");
    $("#artwork-rgb").css("display", "none");
    $("#artwork-cmyk").css("display", "none");
    $(`#${id}`).css("display", "block");
    $(".custom-colors .active").removeClass("active");
    $(`.${id}-color`).addClass("active");
  };

  setBackgroundColor = color => {
    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (activeObject.__proto__.type === "group") {
      switch (this.props.selectedGroupType) {
        case 0:
          activeObject._objects[0].set("stroke", color);
          activeObject._objects[2].set("stroke", color);
          $(".default-color-1").css("background", color);
          break;
        case 1:
          activeObject._objects[1].set("stroke", color);
          $(".default-color-2").css("background", color);
          break;
        case 2:
          activeObject._objects[3].set("stroke", color);
          $(".default-color-3").css("background", color);
          break;
        default:
          break;
      }
    } else if (activeObject.__proto__.type === "path-group") {
      for (let i = 0; i < activeObject.paths.length; i++) {
        let index = this.props.artworkPaths[
          this.props.selectedGroupType
        ].indexOf(i);
        if (index >= 0) activeObject.paths[i].setFill(color);
      }
      $(
        `.artwork-color-pane .default-colors .default-color-${this.props
          .selectedGroupType + 1}`
      ).css("background", color);
    } else {
      if (activeObject.get("fill") === "rgba(0,0,0,0)") {
        activeObject.set("stroke", color);
        $(".circle-color-pane .default-color-2").css("background", color);
      } else {
        if (this.props.selectedGroupType === 0) {
          activeObject.set("fill", color);
          $(".circle-color-pane .default-color-1").css("background", color);
        } else if (this.props.selectedGroupType === 1) {
          activeObject.set("stroke", color);
          $(".circle-color-pane .default-color-2").css("background", color);
        }
      }
    }
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setColorType = type => {
    this.props.setSelectedGroupType(type);
    $(".custom-colors").css("display", "block");
    $("#custom").css("display", "block");
    $("#rgb").css("display", "none");
    $("#cmyk").css("display", "none");
    $("#text-custom").css("display", "block");
    $("#text-rgb").css("display", "none");
    $("#text-cmyk").css("display", "none");
    $("#artwork-custom").css("display", "block");
    $("#artwork-rgb").css("display", "none");
    $("#artwork-cmyk").css("display", "none");
    $(".advanced_span").css("display", "block");
    $(".custom-color").addClass("active");
    $(".rgb-color.active").removeClass("active");
    $(".cmyk-color.active").removeClass("active");
  };

  bindCircleColorBtn = () => {
    $(".custom-colors").css({ display: "block" });
    $("#material-custom").css({ display: "block" });
    $("#material-rgb").css({ display: "none" });
    $("#material-cmyk").css({ display: "none" });
  };

  setCircleColor = e => {
    let { value } = e.target;
    $("#circle-color-bind").css({ background: value });

    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    activeObject.set("stroke", value);
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  sendQuote = (name, email, phone, zipcode, subject, message) => {
    const data = {
      name,
      email,
      phone,
      zipcode,
      subject,
      message
    };
    axios.post("http://localhost:3001/quote", data).then(res => {
      if (res.data === "success") alert("Successfully saved!");
      else alert("An unexpected error occurred. Please contact Admin");
    });
  };

  setTextColor = color => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject == null) return;

    if (this.props.textColorOption === "fill") {
      activeObject.set("fill", color);
    } else {
      activeObject.set("stroke", color);
    }
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setTextKeyColor = e => {
    let { value } = e.target;
    $("#key_get").val(value);
    $("#key_set").val(value);
    const black = value;
    const cyan = $("#cyan_get").val();
    const magenta = $("#magenta_get").val();
    const yellow = $("#yellow_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    $("#cmyk_color").css("background", `rgb(${red}, ${green}, ${blue})`);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (this.props.textColorOption === "fill") {
      activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
    } else {
      activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setTextMagentaColor = e => {
    let { value } = e.target;
    $("#magenta_get").val(value);
    $("#magenta_set").val(value);

    const magenta = value;
    const cyan = $("#cyan_get").val();
    const black = $("#key_get").val();
    const yellow = $("#yellow_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    $("#cmyk_color").css("background", `rgb(${red}, ${green}, ${blue})`);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (this.props.textColorOption === "fill") {
      activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
    } else {
      activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setTextYellowColor = e => {
    let { value } = e.target;
    $("#yellow_get").val(value);
    $("#yellow_set").val(value);

    const yellow = value;
    const cyan = $("#cyan_get").val();
    const black = $("#key_get").val();
    const magenta = $("#magenta_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    $("#cmyk_color").css("background", `rgb(${red}, ${green}, ${blue})`);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;
    if (this.props.textColorOption === "fill") {
      activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
    } else {
      activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setTextCyanColor = e => {
    let { value } = e.target;
    $("#cyan_get").val(value);
    $("#cyan_set").val(value);

    const cyan = value;
    const yellow = $("#yellow_get").val();
    const black = $("#key_get").val();
    const magenta = $("#magenta_get").val();

    const red = 255 * (1 - cyan / 100) * (1 - black / 100);
    const green = 255 * (1 - magenta / 100) * (1 - black / 100);
    const blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    $("#cmyk_color").css("background", `rgb(${red}, ${green}, ${blue})`);

    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;

    if (this.props.textColorOption === "fill") {
      activeObject.set("fill", `rgb(${red}, ${green}, ${blue})`);
    } else {
      activeObject.set("stroke", `rgb(${red}, ${green}, ${blue})`);
    }

    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  setArtworkColor = color => {
    const activeObject = this.props.canvas._activeObject;
    if (!activeObject) return;

    for (let i = 0; i < activeObject.paths.length; i++) {
      let index = this.props.artworkPaths[this.props.selectedGroupType].indexOf(
        i
      );
      if (index >= 0) activeObject.paths[i].setFill(color);
    }
    this.props.canvas.renderAll();
    this.updateCanvasState();
  };

  render() {
    const components_type = this.props.components_type;
    const wrestling_config = this.props.wrestling_config;

    return (
      <>
        <Sidebar />
        <div id="content">
          <div className="outer">
            <div className="inner bg-light lter">
              <ExtraMenu />
              <div className="row ml0 mar ">
                <div className="col-md-3 col-sm-3 text-center pad0 mtopneg">
                  <SidebarItems />
                </div>
                <div className="col-md-8 col-sm-8 text-center pad0 main-content">
                  <div className="row main-edit-content">
                    <div className="addcontdiv">
                      <div className="inneraddcontdiv">
                        <div className="col-md-3">
                          <div className="row circle-color-pane">
                            <img
                              className="cross-icon"
                              src={require("./../assets/img/cross.png")}
                              onClick={() => this.showEditArtWorkDialogue()}
                              alt="cross"
                              style={{ cursor: "pointer" }}
                            ></img>
                            <p
                              className="col-md-12"
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "5px"
                              }}
                            >
                              EDIT ARTWORK
                            </p>
                            <div className="default-colors col-md-12">
                              <span
                                className="col-md-3 default-color-1"
                                style={{
                                  padding: "18px",
                                  background: "black",
                                  marginRight: "18px"
                                }}
                                onClick={() => this.setColorType(0)}
                              ></span>
                              <span
                                className="col-md-3 default-color-2"
                                style={{
                                  padding: "18px",
                                  background: "green",
                                  marginRight: "18px"
                                }}
                                onClick={() => this.setColorType(1)}
                              ></span>
                              <span
                                className="col-md-3 default-color-3"
                                style={{ padding: "18px", background: "red" }}
                                onClick={() => this.setColorType(2)}
                              ></span>
                              <span className="col-md-12 advanced_span">
                                Use Advance Color
                              </span>
                            </div>
                            <div className="col-md-12 custom-colors">
                              <div
                                className="col-md-4 custom-color active"
                                data-target="custom"
                                onClick={() => this.setActiveTab("custom")}
                              >
                                <span
                                  onClick={() => this.setActiveTab("custom")}
                                >
                                  Custom
                                </span>
                              </div>
                              <div
                                className="col-md-4 rgb-color"
                                data-target="rgb"
                                onClick={() => this.setActiveTab("rgb")}
                              >
                                <span onClick={() => this.setActiveTab("rgb")}>
                                  RGB
                                </span>
                              </div>
                              <div
                                className="col-md-4 cmyk-color"
                                data-target="cmyk"
                                onClick={() => this.setActiveTab("cmyk")}
                              >
                                <span onClick={() => this.setActiveTab("cmyk")}>
                                  CMYK
                                </span>
                              </div>
                            </div>
                            <div id="custom" className="col-md-12">
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr1 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ffffff")
                                  }
                                  style={{ background: "white" }}
                                >
                                  <span className="tooltiptext">White</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr2 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#a4aeb5")
                                  }
                                  style={{ background: "#a4aeb5" }}
                                >
                                  <span className="tooltiptext">
                                    Metallic Silver
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr3 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#c3c8c8")
                                  }
                                  style={{ background: "#c3c8c8" }}
                                >
                                  <span className="tooltiptext">
                                    Light Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr4 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#86754f")
                                  }
                                  style={{ background: "#86754f" }}
                                >
                                  <span className="tooltiptext">
                                    Vegas Gold
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr5 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#fedf00")
                                  }
                                  style={{ background: "#fedf00" }}
                                >
                                  <span className="tooltiptext">Yellow</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr6 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ffae00")
                                  }
                                  style={{ background: "#ffae00" }}
                                >
                                  <span className="tooltiptext">
                                    Athletic Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr7 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#d7a900")
                                  }
                                  style={{ background: "#d7a900" }}
                                >
                                  <span className="tooltiptext">
                                    Mat Vinyl Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr8 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ff7900")
                                  }
                                  style={{ background: "#ff7900" }}
                                >
                                  <span className="tooltiptext">Orange</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr9 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#b71234")
                                  }
                                  style={{ background: "#b71234" }}
                                >
                                  <span className="tooltiptext">Red</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr10 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#7c2348")
                                  }
                                  style={{ background: "#7c2348" }}
                                >
                                  <span className="tooltiptext">Maroon</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr11 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#4b306a")
                                  }
                                  style={{ background: "#4b306a" }}
                                >
                                  <span className="tooltiptext">Purple</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr12 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#263f6a")
                                  }
                                  style={{ background: "#263f6a" }}
                                >
                                  <span className="tooltiptext">Navy</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr13 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#0046ad")
                                  }
                                  style={{ background: "#0046ad" }}
                                >
                                  <span className="tooltiptext">
                                    Royal Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr14 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#64a0c8")
                                  }
                                  style={{ background: "#64a0c8" }}
                                >
                                  <span className="tooltiptext">
                                    Carolina Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr15 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#006b36")
                                  }
                                  style={{ background: "#006b36" }}
                                >
                                  <span className="tooltiptext">Green</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr16 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#284e36")
                                  }
                                  style={{ background: "#284e36" }}
                                >
                                  <span className="tooltiptext">
                                    Dark Green
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr17 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#522d24")
                                  }
                                  style={{ background: "#522d24" }}
                                >
                                  <span className="tooltiptext">Brown</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr18 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#4d4f53")
                                  }
                                  style={{ background: "#4d4f53" }}
                                >
                                  <span className="tooltiptext">
                                    Charcoal Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr19 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#0d0000")
                                  }
                                  style={{ background: "#0d0000" }}
                                >
                                  <span className="tooltiptext">Black</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr20 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#002c5f")
                                  }
                                  style={{ background: "#002c5f" }}
                                >
                                  <span className="tooltiptext">UWW Gold</span>
                                </div>
                              </div>
                            </div>
                            <div id="rgb" className="col-md-12">
                              <ColorPickerContainer type={"rect"} />
                            </div>
                            <div id="cmyk" className="col-md-12">
                              <span></span>
                              <div className="row">
                                <div
                                  className="col-md-12"
                                  style={{ background: "#34405a" }}
                                >
                                  {/* <div
                                    className="line-height-blk"
                                    id="cmyk_color"
                                    style={{ display: 'block' }}
                                  ></div> */}
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>C</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="cyan_get"
                                          onChange={this.setCyanColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="cyan_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setCyanColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>M</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="magenta_get"
                                          onChange={this.setMagentaColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="magenta_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setMagentaColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>Y</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="yellow_get"
                                          onChange={this.setYellowColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="yellow_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setYellowColor}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="line-height-blk"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="line-height-label">
                                      <span>K</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="key_get"
                                          onChange={this.setKeyColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="key_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setKeyColor}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn delete"
                              onClick={() => this.deleteSelectedMaterial()}
                            >
                              <img
                                src={require("./../assets/img/del.png")}
                                alt="del"
                              ></img>
                            </button>
                          </div>
                          <div className="row text-color-pane">
                            <img
                              className="cross-icon"
                              src={require("./../assets/img/cross.png")}
                              onClick={() => this.showEditArtWorkDialogue()}
                              alt="cross"
                              style={{ cursor: "pointer" }}
                            ></img>
                            <p
                              className="col-md-12"
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "5px"
                              }}
                            >
                              EDIT TEXT COLOR
                            </p>

                            <div className="col-md-12 custom-colors">
                              <div
                                className="col-md-4 custom-color text-custom-color active"
                                data-target="custom"
                                onClick={() => this.setActiveTab("text-custom")}
                              >
                                <span
                                  onClick={() =>
                                    this.setActiveTab("text-custom")
                                  }
                                >
                                  Custom
                                </span>
                              </div>
                              <div
                                className="col-md-4 rgb-color text-rgb-color"
                                data-target="rgb"
                                onClick={() => this.setActiveTab("text-rgb")}
                              >
                                <span
                                  onClick={() => this.setActiveTab("text-rgb")}
                                >
                                  RGB
                                </span>
                              </div>
                              <div
                                className="col-md-4 cmyk-color text-cmyk-color"
                                data-target="cmyk"
                                onClick={() => this.setActiveTab("text-cmyk")}
                              >
                                <span
                                  onClick={() => this.setActiveTab("text-cmyk")}
                                >
                                  CMYK
                                </span>
                              </div>
                            </div>
                            <div id="text-custom" className="col-md-12">
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr1 tooltip"
                                  onClick={() => this.setTextColor("#ffffff")}
                                  style={{ background: "white" }}
                                >
                                  <span className="tooltiptext">White</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr2 tooltip"
                                  onClick={() => this.setTextColor("#a4aeb5")}
                                  style={{ background: "#a4aeb5" }}
                                >
                                  <span className="tooltiptext">
                                    Metallic Silver
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr3 tooltip"
                                  onClick={() => this.setTextColor("#c3c8c8")}
                                  style={{ background: "#c3c8c8" }}
                                >
                                  <span className="tooltiptext">
                                    Light Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr4 tooltip"
                                  onClick={() => this.setTextColor("#86754f")}
                                  style={{ background: "#86754f" }}
                                >
                                  <span className="tooltiptext">
                                    Vegas Gold
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr5 tooltip"
                                  onClick={() => this.setTextColor("#fedf00")}
                                  style={{ background: "#fedf00" }}
                                >
                                  <span className="tooltiptext">Yellow</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr6 tooltip"
                                  onClick={() => this.setTextColor("#ffae00")}
                                  style={{ background: "#ffae00" }}
                                >
                                  <span className="tooltiptext">
                                    Athletic Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr7 tooltip"
                                  onClick={() => this.setTextColor("#d7a900")}
                                  style={{ background: "#d7a900" }}
                                >
                                  <span className="tooltiptext">
                                    Mat Vinyl Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr8 tooltip"
                                  onClick={() => this.setTextColor("#ff7900")}
                                  style={{ background: "#ff7900" }}
                                >
                                  <span className="tooltiptext">Orange</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr9 tooltip"
                                  onClick={() => this.setTextColor("#b71234")}
                                  style={{ background: "#b71234" }}
                                >
                                  <span className="tooltiptext">Red</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr10 tooltip"
                                  onClick={() => this.setTextColor("#7c2348")}
                                  style={{ background: "#7c2348" }}
                                >
                                  <span className="tooltiptext">Maroon</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr11 tooltip"
                                  onClick={() => this.setTextColor("#4b306a")}
                                  style={{ background: "#4b306a" }}
                                >
                                  <span className="tooltiptext">Purple</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr12 tooltip"
                                  onClick={() => this.setTextColor("#263f6a")}
                                  style={{ background: "#263f6a" }}
                                >
                                  <span className="tooltiptext">Navy</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr13 tooltip"
                                  onClick={() => this.setTextColor("#0046ad")}
                                  style={{ background: "#0046ad" }}
                                >
                                  <span className="tooltiptext">
                                    Royal Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr14 tooltip"
                                  onClick={() => this.setTextColor("#64a0c8")}
                                  style={{ background: "#64a0c8" }}
                                >
                                  <span className="tooltiptext">
                                    Carolina Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr15 tooltip"
                                  onClick={() => this.setTextColor("#006b36")}
                                  style={{ background: "#006b36" }}
                                >
                                  <span className="tooltiptext">Green</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr16 tooltip"
                                  onClick={() => this.setTextColor("#284e36")}
                                  style={{ background: "#284e36" }}
                                >
                                  <span className="tooltiptext">
                                    Dark Green
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr17 tooltip"
                                  onClick={() => this.setTextColor("#522d24")}
                                  style={{ background: "#522d24" }}
                                >
                                  <span className="tooltiptext">Brown</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr18 tooltip"
                                  onClick={() => this.setTextColor("#4d4f53")}
                                  style={{ background: "#4d4f53" }}
                                >
                                  <span className="tooltiptext">
                                    Charcoal Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr19 tooltip"
                                  onClick={() => this.setTextColor("#0d0000")}
                                  style={{ background: "#0d0000" }}
                                >
                                  <span className="tooltiptext">Black</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr20 tooltip"
                                  onClick={() => this.setTextColor("#002c5f")}
                                  style={{ background: "#002c5f" }}
                                >
                                  <span className="tooltiptext">UWW Gold</span>
                                </div>
                              </div>
                            </div>
                            <div id="text-rgb" className="col-md-12">
                              <ColorPickerContainer type={"text"} />
                            </div>
                            <div id="text-cmyk" className="col-md-12">
                              <span></span>
                              <div className="row">
                                <div
                                  className="col-md-12"
                                  style={{ background: "#34405a" }}
                                >
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>C</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="cyan_get"
                                          onChange={this.setTextCyanColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="cyan_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setTextCyanColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>M</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="magenta_get"
                                          onChange={this.setTextMagentaColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="magenta_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setTextMagentaColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>Y</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="yellow_get"
                                          onChange={this.setTextYellowColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="yellow_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setTextYellowColor}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="line-height-blk"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="line-height-label">
                                      <span>K</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="key_get"
                                          onChange={this.setTextKeyColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="key_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setTextKeyColor}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn delete"
                              onClick={() => this.deleteSelectedMaterial()}
                            >
                              <img
                                src={require("./../assets/img/del.png")}
                                alt="del"
                              ></img>
                            </button>
                          </div>
                          <div className="row artwork-color-pane">
                            <img
                              className="cross-icon"
                              src={require("./../assets/img/cross.png")}
                              onClick={() => this.showEditArtWorkDialogue()}
                              alt="cross"
                              style={{ cursor: "pointer" }}
                            ></img>
                            <p
                              className="col-md-12"
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "5px"
                              }}
                            >
                              EDIT ARTWORK
                            </p>
                            <div className="default-colors">
                              <span
                                className=" default-color-1"
                                style={{
                                  padding: "8px 15px",
                                  background: "black",
                                  marginRight: "8px",
                                  width: 30
                                }}
                                onClick={() => this.setColorType(0)}
                              ></span>
                              {this.props.artworkPaths[1] !== undefined ? (
                                <span
                                  className="default-color-2"
                                  style={{
                                    padding: "8px 15px",
                                    background: "green",
                                    marginRight: "8px",
                                    width: 30
                                  }}
                                  onClick={() => this.setColorType(1)}
                                ></span>
                              ) : (
                                <div />
                              )}
                              {this.props.artworkPaths[2] !== undefined ? (
                                <span
                                  className="default-color-3"
                                  style={{
                                    padding: "8px 15px",
                                    background: "red",
                                    marginRight: "8px",
                                    width: 30
                                  }}
                                  onClick={() => this.setColorType(2)}
                                ></span>
                              ) : (
                                <div />
                              )}
                              {this.props.artworkPaths[3] !== undefined ? (
                                <span
                                  className="default-color-4"
                                  style={{
                                    padding: "8px 15px",
                                    background: "red",
                                    width: 30
                                  }}
                                  onClick={() => this.setColorType(3)}
                                ></span>
                              ) : (
                                <div />
                              )}
                              <span className="col-md-12 advanced_span">
                                Use Advance Color
                              </span>
                            </div>
                            <div className="col-md-12 custom-colors">
                              <div
                                className="col-md-4 custom-color artwork-custom-color active"
                                data-target="custom"
                                onClick={() =>
                                  this.setActiveTab("artwork-custom")
                                }
                              >
                                <span
                                  onClick={() =>
                                    this.setActiveTab("artwork-custom")
                                  }
                                >
                                  Custom
                                </span>
                              </div>
                              <div
                                className="col-md-4 rgb-color artwork-rgb-color"
                                data-target="rgb"
                                onClick={() => this.setActiveTab("artwork-rgb")}
                              >
                                <span
                                  onClick={() =>
                                    this.setActiveTab("artwork-rgb")
                                  }
                                >
                                  RGB
                                </span>
                              </div>
                              <div
                                className="col-md-4 cmyk-color artwork-cmyk-color"
                                data-target="cmyk"
                                onClick={() =>
                                  this.setActiveTab("artwork-cmyk")
                                }
                              >
                                <span
                                  onClick={() =>
                                    this.setActiveTab("artwork-cmyk")
                                  }
                                >
                                  CMYK
                                </span>
                              </div>
                            </div>
                            <div id="artwork-custom" className="col-md-12">
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr1 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ffffff")
                                  }
                                  style={{ background: "white" }}
                                >
                                  <span className="tooltiptext">White</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr2 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#a4aeb5")
                                  }
                                  style={{ background: "#a4aeb5" }}
                                >
                                  <span className="tooltiptext">
                                    Metallic Silver
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr3 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#c3c8c8")
                                  }
                                  style={{ background: "#c3c8c8" }}
                                >
                                  <span className="tooltiptext">
                                    Light Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr4 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#86754f")
                                  }
                                  style={{ background: "#86754f" }}
                                >
                                  <span className="tooltiptext">
                                    Vegas Gold
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr5 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#fedf00")
                                  }
                                  style={{ background: "#fedf00" }}
                                >
                                  <span className="tooltiptext">Yellow</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr6 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ffae00")
                                  }
                                  style={{ background: "#ffae00" }}
                                >
                                  <span className="tooltiptext">
                                    Athletic Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr7 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#d7a900")
                                  }
                                  style={{ background: "#d7a900" }}
                                >
                                  <span className="tooltiptext">
                                    Mat Vinyl Gold
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr8 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#ff7900")
                                  }
                                  style={{ background: "#ff7900" }}
                                >
                                  <span className="tooltiptext">Orange</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr9 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#b71234")
                                  }
                                  style={{ background: "#b71234" }}
                                >
                                  <span className="tooltiptext">Red</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr10 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#7c2348")
                                  }
                                  style={{ background: "#7c2348" }}
                                >
                                  <span className="tooltiptext">Maroon</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr11 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#4b306a")
                                  }
                                  style={{ background: "#4b306a" }}
                                >
                                  <span className="tooltiptext">Purple</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr12 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#263f6a")
                                  }
                                  style={{ background: "#263f6a" }}
                                >
                                  <span className="tooltiptext">Navy</span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr13 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#0046ad")
                                  }
                                  style={{ background: "#0046ad" }}
                                >
                                  <span className="tooltiptext">
                                    Royal Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr14 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#64a0c8")
                                  }
                                  style={{ background: "#64a0c8" }}
                                >
                                  <span className="tooltiptext">
                                    Carolina Blue
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr15 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#006b36")
                                  }
                                  style={{ background: "#006b36" }}
                                >
                                  <span className="tooltiptext">Green</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr16 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#284e36")
                                  }
                                  style={{ background: "#284e36" }}
                                >
                                  <span className="tooltiptext">
                                    Dark Green
                                  </span>
                                </div>
                              </div>
                              <div className="preset-color-row">
                                <div
                                  className="pre-clr-box clr-pr17 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#522d24")
                                  }
                                  style={{ background: "#522d24" }}
                                >
                                  <span className="tooltiptext">Brown</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr18 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#4d4f53")
                                  }
                                  style={{ background: "#4d4f53" }}
                                >
                                  <span className="tooltiptext">
                                    Charcoal Gray
                                  </span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr19 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#0d0000")
                                  }
                                  style={{ background: "#0d0000" }}
                                >
                                  <span className="tooltiptext">Black</span>
                                </div>
                                <div
                                  className="pre-clr-box clr-pr20 tooltip"
                                  onClick={() =>
                                    this.setBackgroundColor("#002c5f")
                                  }
                                  style={{ background: "#002c5f" }}
                                >
                                  <span className="tooltiptext">UWW Gold</span>
                                </div>
                              </div>
                            </div>
                            <div id="artwork-rgb" className="col-md-12">
                              <ColorPickerContainer type={"rect"} />
                            </div>
                            <div id="artwork-cmyk" className="col-md-12">
                              <span></span>
                              <div className="row">
                                <div
                                  className="col-md-12"
                                  style={{ background: "#34405a" }}
                                >
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>C</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="cyan_get"
                                          onChange={this.setCyanColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="cyan_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setCyanColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>M</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="magenta_get"
                                          onChange={this.setMagentaColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="magenta_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setMagentaColor}
                                      />
                                    </div>
                                  </div>
                                  <div className="line-height-blk">
                                    <div className="line-height-label">
                                      <span>Y</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="yellow_get"
                                          onChange={this.setYellowColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="yellow_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setYellowColor}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="line-height-blk"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="line-height-label">
                                      <span>K</span>
                                    </div>
                                    <div className="line-height-label">
                                      <div className="range-slidecontainer">
                                        <input
                                          type="range"
                                          min="1"
                                          max="100"
                                          defaultValue="1"
                                          className="range-slider"
                                          id="key_get"
                                          onChange={this.setKeyColor}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="line-height-value">
                                      <input
                                        type="number"
                                        id="key_set"
                                        className="btn ln-ht-val-btn"
                                        defaultValue="1"
                                        min="1"
                                        max="100"
                                        onChange={this.setKeyColor}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn delete"
                              onClick={() => this.deleteSelectedMaterial()}
                            >
                              <img
                                src={require("./../assets/img/del.png")}
                                alt="del"
                              ></img>
                            </button>
                          </div>

                          <div className="row"> </div>
                        </div>
                      </div>
                      <Container fluid className="main-content-container px-4">
                        <DesignCanvas>
                          {components_type.map((type, idx) => {
                            switch (type) {
                              case "Image":
                                return <Image key={idx} />;
                              case "Artwork":
                                return <Artwork key={idx} />;
                              case "Circle1":
                                return <Circle1 key={idx} />;
                              case "Circle2":
                                return <Circle2 key={idx} />;
                              case "Circle3":
                                return <Circle3 key={idx} />;
                              case "Circle4":
                                return <Circle4 key={idx} />;
                              case "Circle5":
                                return <Circle5 key={idx} />;
                              case "Circle6":
                                return <Circle6 key={idx} />;
                              case "Circle7":
                                return <Circle7 key={idx} />;
                              case "Circle8":
                                return <Circle8 key={idx} />;
                              default:
                                return <CurvedText key={idx} />;
                            }
                          })}
                        </DesignCanvas>
                      </Container>
                      <p className="matsize">
                        <span>
                          MAT SIZE : {wrestling_config.width * 2} x{" "}
                          {wrestling_config.height * 2}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div id="drag_image" />
                  <div id="drag_template" />
                  <div className="getquote">
                    <div className="inline-btns">
                      <p>
                        <QuoteModal sendQuote={this.sendQuote} />
                        <span className="cgrid">
                          <a href="#" onClick={this.clearCanvas}>
                            <img
                              src={require("./../assets/img/del.png")}
                              alt="Delete"
                            />{" "}
                            Clear Grid
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 col-sm-1 text-center pad0 h7 toolbar">
                  <Toolbar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const setSaveDesignID = id => {
  return {
    type: "SET_SAVED_ID",
    id: id
  };
};

const setCanvasConfig = _config => {
  return {
    type: "SET_CONFIG",
    _config
  };
};

const setSelectedGroupType = type => {
  return {
    type: "SET_GROUP_SELECT",
    groupType: type
  };
};

const clearCanvas = () => {
  return {
    type: "CLAER_CANVAS",
    isCanvasCleared: true
  };
};

const mapStateToProps = state => {
  return {
    _config: state._config,
    components_type: [...state.components_type],
    wrestling_config: state.wrestling_config,
    canvas: state.canvas,
    selectedGroupType: state.selectedGroupType,
    textColorOption: state.textColorOption,
    artworkPaths: state.artworkPaths
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setSaveDesignID, setCanvasConfig, setSelectedGroupType, clearCanvas },
    dispatch
  );
};

const Wrestling_Designer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default Wrestling_Designer;

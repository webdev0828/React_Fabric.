import React, { useState } from "react";
import "../assets/css/bootstrap.css";
import "../assets/css/fontawesome.css";
import "../assets/css/wrestling.css";
import "../assets/css/metisMenu.css";
import "../assets/css/onoffcanvas.css";
import "../assets/css/animate.css";
import { Container } from "shards-react";
import "fabric-webpack";
import DesignCanvas from "../components/layout/wallpad_mat_designer/DesignCanvas";
import { connect } from "react-redux";
import CurvedText from "../components/CurvedText";
import Image from "../components/Image";
import { bindActionCreators } from "redux";
import Sidebar from "../components/layout/wallpad_mat_designer/Sidebar";
import Toolbar from "../components/layout/wallpad_mat_designer/Toolbar";
import ExtraMenu from "../components/layout/wallpad_mat_designer/ExtraMenu";
import SidebarItems from "../components/layout/wallpad_mat_designer/SidebarItems";
import OptionSettingDialogue from "../components/layout/wallpad_mat_designer/Option_Settting_Dialogue";
import QuoteModal from "./../components/layout/QuoteModal";
import ColorPickerContainer from "./../components/ColorPicker";
import axios from "axios";
import $ from "jquery";

class Dashboard extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.props.setSaveDesignID(id);
      // axios.post("http://localhost:3001/load_design", { id: id }).then(res => {
      //   let tempConfig = res.data;
      //   this.props.saveWallpadCanvasData(tempConfig);
      //   // tempConfig.map(temp => {
      //   //   this.props.addNewWallPad(temp.config.width);
      //   //   this.props.saveWallpadCanvasData(temp.data);
      //   // });
      // });
    }
    $(".text-color-pane").css({ display: "none" });
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

  clearCanvas = e => {
    e.preventDefault();
    this.props.canvas.clear();
    this.updateCanvasState();
    this.props.clearCanvas();
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

  setLeftWallPad = () => {
    let index = this.props.wallpad_config.current_wallpad / 1;
    if (index === 0) index = this.props.wallpad_config["config"].length;
    index = (index - 1) % 4;
    $(".wallpad_0").css("display", "none");
    $(".wallpad_1").css("display", "none");
    $(".wallpad_2").css("display", "none");
    $(".wallpad_3").css("display", "none");
    $(".wallpad_0")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_1")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_2")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_3")
      .closest("div.canvas-container")
      .css("display", "none");

    $(`.wallpad_${index}`)
      .closest("div.canvas-container")
      .css("display", "block");
    $(`.wallpad_${index}`).css("display", "block");

    this.props.setCurrentWallPad(index);
    this.props.canvas.discardActiveObject();
  };

  setRightWallPad = () => {
    let index = this.props.wallpad_config.current_wallpad / 1;
    index = (index + 1) % this.props.wallpad_config["config"].length;
    $(".wallpad_0").css("display", "none");
    $(".wallpad_1").css("display", "none");
    $(".wallpad_2").css("display", "none");
    $(".wallpad_3").css("display", "none");
    $(".wallpad_0")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_1")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_2")
      .closest("div.canvas-container")
      .css("display", "none");
    $(".wallpad_3")
      .closest("div.canvas-container")
      .css("display", "none");

    $(`.wallpad_${index}`)
      .closest("div.canvas-container")
      .css("display", "block");
    $(`.wallpad_${index}`).css("display", "block");

    this.props.setCurrentWallPad(index);
    this.props.canvas.discardActiveObject();
  };

  showEditArtWorkDialogue = () => {
    $(".material-color-pane").css({ display: "none" });
    $(".circle-color-pane").css({ display: "none" });
    $(".text-color-pane").css({ display: "none" });
  };

  setActiveTab = id => {
    $("#text-custom").css("display", "none");
    $("#text-rgb").css("display", "none");
    $("#text-cmyk").css("display", "none");
    $(`#${id}`).css("display", "block");
    $(".custom-colors .active").removeClass("active");
    $(`.${id}-color`).addClass("active");
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

  deleteSelectedMaterial = () => {
    let activeObject = this.props.canvas._activeObject;
    if (activeObject) {
      this.props.canvas.remove(activeObject);
    }
    this.updateCanvasState();
  };

  render() {
    const components_type = this.props.components_type;
    const wallpad_config = this.props.wallpad_config;
    const current_wallpad = wallpad_config.current_wallpad;
    let width = null;
    let height = null;
    if (!wallpad_config.option_setting) return <OptionSettingDialogue />;
    else {
      width =
        wallpad_config["config"][current_wallpad] === undefined
          ? 0
          : wallpad_config["config"][current_wallpad].width;
      height =
        wallpad_config["config"][current_wallpad] === undefined
          ? 0
          : wallpad_config["config"][current_wallpad].height;
    }

    return (
      <>
        <Sidebar />
        <div id="content" className="wallpad-content">
          <div className="outer">
            <div className="inner bg-light lter">
              <ExtraMenu />
              <div
                className="row ml0 mar"
                style={{ backgroundColor: "#ebf6f8" }}
              >
                <div className="col-md-3 col-sm-3 text-center pad0 mtopneg">
                  <SidebarItems />
                </div>
                <div
                  className="col-md-8 col-sm-8 text-center pad0 main-content"
                  style={{ paddingBottom: "35px" }}
                >
                  <div className="row main-edit-content">
                    <div className="addcontdiv">
                      <div className="inneraddcontdiv">
                        <div className="col-md-3">
                          <div className="row material-color-pane">
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
                                paddingBottom: "15px"
                              }}
                            >
                              EDIT ARTWORK
                            </p>
                            <button
                              id="circle-color-bind"
                              className="btn col-md-12"
                              onClick={() => this.bindCircleColorBtn()}
                            ></button>
                            <input
                              type="color"
                              id="circle-color"
                              className="btn"
                              defaultValue="black"
                              onChange={this.setCircleColor}
                            />

                            <button
                              className="btn col-md-5 redo"
                              onClick={() => this.duplicateSelectedMaterial()}
                            >
                              <img
                                src={require("./../assets/img/duplicate.png")}
                                alt="redo"
                              ></img>
                            </button>
                            <button
                              className="btn col-md-5 delete"
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

                          <div className="row"> </div>
                        </div>
                      </div>
                      <Container fluid className="main-content-container px-4">
                        <DesignCanvas>
                          {components_type.map((type, idx) => {
                            switch (type) {
                              case "Image":
                                return <Image key={idx} />;
                              default:
                                return <CurvedText key={idx} />;
                            }
                          })}
                        </DesignCanvas>
                      </Container>
                      <div className="row" style={{ paddingTop: "15px" }}>
                        <img
                          src={require("./../assets/img/angle-left.png")}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => this.setLeftWallPad()}
                          alt="left arrow"
                        ></img>
                        <img
                          src={require("./../assets/img/angle-right.png")}
                          style={{ cursor: "pointer" }}
                          onClick={() => this.setRightWallPad()}
                          alt="right arrow"
                        ></img>
                      </div>
                      <p className="matsize">
                        <span style={{ cursor: "pointer" }}>
                          MAT SIZE : {width} x {height}
                        </span>
                      </p>
                    </div>
                  </div>
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

const setCurrentWallPad = index => {
  return {
    type: "SET_CURRENT_WALLPAD",
    index
  };
};

const clearCanvas = () => {
  return {
    type: "CLAER_CANVAS",
    isCanvasCleared: true
  };
};

const addNewWallPad = length => {
  return {
    type: "SET_WALLPAD",
    length
  };
};

const saveWallpadCanvasData = data => {
  return {
    type: "SAVE_WALLPAD_CANVAS_DATA",
    data
  };
};

const mapStateToProps = state => {
  return {
    _config: state._config,
    components_type: [...state.components_type],
    wallpad_config: state.wallpad_config,
    canvas: state.canvas,
    textColorOption: state.textColorOption,
    saved_id: state.saved_id,
    load_design: state.load_design
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSaveDesignID,
      setCanvasConfig,
      setCurrentWallPad,
      addNewWallPad,
      saveWallpadCanvasData,
      clearCanvas
    },
    dispatch
  );
};

const WallPad_Designer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default WallPad_Designer;

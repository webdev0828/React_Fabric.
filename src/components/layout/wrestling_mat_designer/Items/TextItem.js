import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import { Popover } from "antd";
import "../../../../assets/css/swain.css";
import FontFaceObserver from "fontfaceobserver";

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
            src={require("./../../../../assets/img/text-style_1.png")}
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
            src={require("./../../../../assets/img/text-style_2.png")}
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
            src={require("./../../../../assets/img/text-style_3.png")}
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
            src={require("./../../../../assets/img/text-style_4.png")}
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
      this.props.setComponentType("StraightText");
      this.props.setCurvedTextStyle(data);
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
        10}%, #fff ${value * 10}%, #fff 100%)`
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
        9}%, #fff ${value * 9}%, #fff 100%)`
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

    // activeObject.setFontFamily(value)
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

const setComponentType = type => {
  return {
    type: "SET_COMPONENT_TYPE",
    component_type: type
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
      setComponentType,
      setCurvedTextStyle,
      setCanvasConfig,
      setLetterSpacingOption,
      setSelectedText,
      setTextColorOption
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    _config: state._config,
    canvas: state.canvas,
    canvas_grid: state.canvas_grid,
    templates: state.templates,
    logo_url: state.logo_url
  };
};

const TextToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForText
)(TextToolbar);

class TextToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById("mySidenav4").style.width = "0";
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
          className="text-center h100 pad0 mtopneg sidenav4 formobview wo"
          id="mySidenav4"
        >
          <a
            style={{ color: "#fff" }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <TextToolbarConnect />
        </div>
      </>
    );
  }
}

export default TextToolSidebar;

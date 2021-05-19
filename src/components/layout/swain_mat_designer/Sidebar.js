import React from "react";
import $ from "jquery";

class Sidebar extends React.Component {
  componentDidMount = () => {
    $("#menu li.nav.mats").addClass("active");
  };

  setActiveToolbar = e => {
    e.preventDefault();
    let target = $(e.target).attr("data-target");
    $(".second-menu").hide();
    $("#" + target).show();
    $(`#menu li.nav.active`).removeClass("active");
    $(`#menu li.nav.${target}`).addClass("active");
  };

  openNav1 = e => {
    document.getElementById("mySidenav1").style.width = "300px";
  };

  openNav2 = () => {
    document.getElementById("mySidenav2").style.width = "250px";
  };

  openNav3 = () => {
    document.getElementById("mySidenav3").style.width = "250px";
  };

  openNav4 = () => {
    document.getElementById("mySidenav4").style.width = "250px";
  };

  render() {
    return (
      <>
        <div id="left">
          <ul id="menu" className="bg-blue dker fordeskview">
            <li className="nav mats">
              <a
                href="#"
                data-target="mats"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require("./../../../assets/img/mats.png")}
                  data-target="mats"
                  onClick={this.setActiveToolbar}
                  alt="Mats"
                />
                <span
                  className="link-title"
                  data-target="mats"
                  onClick={this.setActiveToolbar}
                >
                  &nbsp;Mats
                </span>
              </a>
            </li>

            <li className="nav template">
              <a
                href="#"
                data-target="template"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require("./../../../assets/img/templates.png")}
                  data-target="template"
                  onClick={this.setActiveToolbar}
                  alt="Templates"
                />
                <span
                  className="link-title"
                  data-target="template"
                  onClick={this.setActiveToolbar}
                >
                  Templates
                </span>
              </a>
            </li>

            <li className="nav text">
              <a
                href="#"
                data-target="text"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require("./../../../assets/img/addtext.png")}
                  data-target="text"
                  onClick={this.setActiveToolbar}
                  alt="Text"
                />
                <span
                  className="link-title"
                  data-target="text"
                  onClick={this.setActiveToolbar}
                >
                  Add Text
                </span>{" "}
              </a>
            </li>

            <li className="nav logo">
              <a
                href="#"
                data-target="logo"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require("./../../../assets/img/addlogo.png")}
                  data-target="logo"
                  onClick={this.setActiveToolbar}
                  alt="Add Logo"
                />
                <span
                  className="link-title"
                  data-target="logo"
                  onClick={this.setActiveToolbar}
                >
                  Add Logo
                </span>
              </a>
            </li>
          </ul>
          <ul id="menu" className="bg-blue dker formobview">
            <li className="nav-divider"></li>
            <li onClick={this.openNav1}>
              <a href="#" data-target="mats" className="leftMenu">
                <img
                  className="blk"
                  src={require("./../../../assets/img/mats.png")}
                  alt="Mats"
                />
                <span className="link-title">&nbsp;Mats</span>
              </a>
            </li>

            <li onClick={() => this.openNav2()}>
              <a href="#" data-target="template" className="leftMenu">
                <img
                  className="blk"
                  src={require("./../../../assets/img/templates.png")}
                  alt="Templates"
                />
                <span className="link-title">Templates</span>
              </a>
            </li>
            <li onClick={() => this.openNav3()}>
              <a href="#" data-target="text" className="leftMenu">
                <img
                  className="blk"
                  src={require("./../../../assets/img/addtext.png")}
                  alt="Text"
                />
                <span className="link-title">Add Text</span>{" "}
              </a>
            </li>
            <li onClick={() => this.openNav4()}>
              <a href="#" data-target="logo" className="leftMenu">
                <img
                  className="blk"
                  src={require("./../../../assets/img/addlogo.png")}
                  alt="Add Logo"
                />
                <span className="link-title">Add Logo</span>
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;

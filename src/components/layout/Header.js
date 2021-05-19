import React from "react";

class Header extends React.Component {
  opennav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  render() {
    return (
      <>
        <div className="see-instruction fordeskview">
          <div className="container">
            <div className="left-cap default-left">
              <small>Home - DesignLab v5</small>
              <h1>
                <span>See Instructions Below</span>{" "}
                <img
                  className="fr"
                  src={require("./../../assets/img/logo.png")}
                  alt="LOGO"
                />
              </h1>
            </div>
          </div>
        </div>
        <div className="see-instruction formobview">
          <div id="mySidenav" className="sidenav">
            <a href="#" className="closebtn" onClick={() => this.closeNav()}>
              &times;
            </a>
            <a href="#">Wrestling</a>
            <a href="#">Martials Arts & MMA</a>
            <a href="#">Fitness & Gym</a>
            <a href="#">Gymnastics</a>
            <a href="/">Cheerleading</a>
            <a href="/">Yoga & Pilates</a>
            <a href="/">Indoor Sports Turf</a>
          </div>
          <span
            style={{ fontSize: 30, cursor: "pointer" }}
            onClick={() => this.openNav()}
          >
            <img src={require("./../../assets/img/menu.png")} alt="Menu" />
          </span>
          <img
            className="fr moblogo"
            src={require("./../../assets/img/moblogo.png")}
            alt="LOGO"
          />
        </div>
      </>
    );
  }
}

export default Header;

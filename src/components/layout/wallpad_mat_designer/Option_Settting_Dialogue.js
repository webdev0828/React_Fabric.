import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class OptionSettingDialogue extends React.Component {
  state = {
    wallpad: 0,
    length: 10,
    count: 0
  };

  onBuild = e => {
    e.preventDefault();
    if (this.state.count >= 1) this.props.setWallPadConfig();
    else alert("Please select all Wallpad Length");
  };

  addwallpad = () => {
    if (this.state.length === 0) alert("Please select the length");
    else if (this.state.count === 4) alert("You already selected 4 walls.");
    else {
      this.setState({ count: this.state.count + 1 });
      this.props.addNewWallPad(this.state.length);
    }
  };

  setWallpad = e => {
    this.setState({ wallpad: e.target.value });
  };

  setWallpadLength = e => {
    this.setState({ length: e.target.value });
  };

  render() {
    const config = this.props.wallpad_config["config"];
    return (
      <div className="see-instruction int-matbuild default-left wallpad">
        <div className="container">
          <div className="innerint default-left text-center">
            <h2>Interactive Wall Pad Builder</h2>
            <p>Select up to 4 walls and each length.</p>

            <div className=" selectboxes default-left">
              <div className="row innerselect_box">
                <div className="col-md-4 col-sm-12 selectcol col_1">
                  <select
                    className="mdb-select md-form colorful-select dropdown-primary wallpad"
                    onChange={this.setWallpad}
                  >
                    <option value="0" defaultChecked>
                      WALL 1
                    </option>
                    <option value="1">WALL 2</option>
                    <option value="2">WALL 3</option>
                    <option value="3">WALL 4</option>
                  </select>
                </div>
                <div className="col-md-3 col-sm-12 selectcol col_2">
                  <input
                    type="number"
                    className="mdb-select md-form colorful-select dropdown-primary wallpad_length"
                    min="1"
                    max="100"
                    defaultValue="10"
                    onChange={this.setWallpadLength}
                  />
                </div>
                <div className="col-md-4 col-sm-12 selectcol col_3">
                  <div className="row height-block">
                    <div
                      className="col-md-8 col-sm-8 pr-0"
                      style={{
                        fontSize: "22px",
                        color: "white",
                        lineHeight: "2.0"
                      }}
                    >
                      HEIGHT:6FT
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <button
                        className="btn btn-outline-primary addbtn"
                        onClick={() => this.addwallpad()}
                      >
                        {" "}
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="default-left back-fwd-btns">
            <table>
              <tbody>
                <tr>
                  <th colSpan="3">SELECTED MEASUREMENTS</th>
                </tr>
                {config.map((config, index) => {
                  return (
                    <tr key={index}>
                      <td>WALL {index + 1}</td>
                      <td>LENGTH {config.width}FT</td>
                      <td>HEIGHT 6FT</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="default-left back-fwd-btns">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="bk">
                  <a href="/">
                    <img
                      src={require("./../../../assets/img/bkarw.png")}
                      alt="Back Arrow"
                    />
                    <span>Back</span>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="fw">
                  <a href="#" onClick={this.onBuild}>
                    <span>Build it</span>
                    <img
                      src={require("./../../../assets/img/fwarw.png")}
                      alt="Forward Arrow"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="default-left entertxt text-center">
                <p>
                  For odd shaped rooms, put in your best <br />
                  guess of the area & speak to one of our mat experts for a{" "}
                  <br /> more accurate idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const addNewWallPad = length => {
  return {
    type: "SET_WALLPAD",
    length
  };
};

const setWallPadConfig = () => {
  return {
    type: "SET_WALLPAD_CONFIG"
  };
};

const mapStateToProps = state => {
  return {
    wallpad_config: state.wallpad_config
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addNewWallPad, setWallPadConfig }, dispatch);
};

const OptionSettingConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionSettingDialogue);

export default OptionSettingConnect;

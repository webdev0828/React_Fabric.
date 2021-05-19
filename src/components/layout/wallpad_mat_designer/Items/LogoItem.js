import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import axios from "axios";

const ImageList = props => {
  const files = props.files;
  if (files.length <= 0) return <div />;
  else
    return files.map((file, idx) => (
      <div className="col-md-4" key={`div_${idx}`}>
        <img
          src={require(`./../../../../../icons/${file}`)}
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
    this.props.setComponentType("Image");
  };

  render() {
    const files = this.state.files;
    return (
      <>
        <div className="row adddiv">
          <h2>Add Logo</h2>
          <p onClick={() => this.bindFileExplorer()}>
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

const setComponentType = type => {
  return {
    type: "SET_COMPONENT_TYPE",
    component_type: type
  };
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToPropsForLogo = dispatch => {
  return bindActionCreators({ setImageUrl, setComponentType }, dispatch);
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

export default LogoToolSidebar;

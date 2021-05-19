import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import $ from 'jquery'

const ImageList = props => {
  const files = props.files
  if (files.length === 0) return <div />
  else
    return files.map((file, idx) => (
      <div className="col-md-6 col-sm-6" key={idx}>
        <div className="temrows mat-lft-repeat-blk">
          <img
            src={require(`./../../../../../artworks/${file}`)}
            alt="Template"
            className="img-responsive"
            onClick={props.addNewArtWork}
          />
        </div>
      </div>
    ))
}

const OneColorLogos = props => {
  const [files, setFiles] = useState()
  useEffect(() => {
    axios
      .post('http://localhost:3001/load_logo', { dir: '1-Color' })
      .then(res => {
        setFiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (files === undefined) return <div />
  return (
    <>
      {files.map((file, index) => {
        return (
          <div className="col-md-6 col-sm-6" key={index}>
            <div className="temrows mat-lft-repeat-blk">
              <img
                src={require(`./../../../../assets/logos/1-Color/${file}`)}
                alt="Template"
                className="img-responsive"
                onClick={props.addNewArtWork}
              />
            </div>
          </div>
        )
      })}
      )
    </>
  )
}

const TwoColorLogos = props => {
  const [files, setFiles] = useState()
  useEffect(() => {
    axios
      .post('http://localhost:3001/load_logo', { dir: '2-Color' })
      .then(res => {
        setFiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (files === undefined) return <div />
  return (
    <>
      {files.map((file, index) => {
        return (
          <div className="col-md-6 col-sm-6" key={index}>
            <div className="temrows mat-lft-repeat-blk">
              <img
                src={require(`./../../../../assets/logos/2-Color/${file}`)}
                alt="Template"
                className="img-responsive"
                onClick={props.addNewArtWork}
              />
            </div>
          </div>
        )
      })}
      )
    </>
  )
}

const ThreeColorLogos = props => {
  const [files, setFiles] = useState()
  useEffect(() => {
    axios
      .post('http://localhost:3001/load_logo', { dir: '3-Color' })
      .then(res => {
        setFiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (files === undefined) return <div />
  return (
    <>
      {files.map((file, index) => {
        return (
          <div className="col-md-6 col-sm-6" key={index}>
            <div className="temrows mat-lft-repeat-blk">
              <img
                src={require(`./../../../../assets/logos/3-Color/${file}`)}
                alt="Template"
                className="img-responsive"
                onClick={props.addNewArtWork}
              />
            </div>
          </div>
        )
      })}
      )
    </>
  )
}

const FourColorLogos = props => {
  const [files, setFiles] = useState()
  useEffect(() => {
    axios
      .post('http://localhost:3001/load_logo', { dir: '4-Color' })
      .then(res => {
        setFiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (files === undefined) return <div />
  return (
    <>
      {files.map((file, index) => {
        return (
          <div className="col-md-6 col-sm-6" key={index}>
            <div className="temrows mat-lft-repeat-blk">
              <img
                src={require(`./../../../../assets/logos/4-Color/${file}`)}
                alt="Template"
                className="img-responsive"
                onClick={props.addNewArtWork}
              />
            </div>
          </div>
        )
      })}
      )
    </>
  )
}

const PracticeCircles = props => {
  const [files, setFiles] = useState()
  useEffect(() => {
    axios
      .post('http://localhost:3001/load_logo', { dir: 'Practice Circles' })
      .then(res => {
        setFiles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (files === undefined) return <div />
  return (
    <>
      {files.map((file, index) => {
        return (
          <div className="col-md-6 col-sm-6" key={index}>
            <div className="temrows mat-lft-repeat-blk">
              <img
                src={require(`./../../../../assets/logos/Practice Circles/${file}`)}
                alt="Template"
                className="img-responsive"
                onClick={props.addNewArtWork}
              />
            </div>
          </div>
        )
      })}
      )
    </>
  )
}

class ArtworkToolbar extends React.Component {
  state = {
    files: [],
    logoType: '1',
  }

  componentDidMount = () => {
    axios
      .post('http://localhost:3001/artwork_images')
      .then(res => {
        this.setState({ files: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addNewArtWork = e => {
    let activeObject = this.props.canvas._activeObject
    if (activeObject) return
    let { src } = e.target
    this.props.setImageUrl(src)
    this.props.setComponentType('Artwork')
  }

  addNewLogo = e => {
    let { src } = e.target
    this.props.setImageUrl(src)
    this.props.setComponentType('Image')
  }

  bindFileExplorer = e => {
    e.preventDefault()
    $('#customFile').click()
  }

  onChangeHandler = e => {
    let formData = new FormData()

    const files = Array.from(e.target.files)
    files.forEach(file => {
      formData.append('file', file)
    })

    axios
      .post('http://localhost:3001/upload_artworks', formData)
      .then(res => {
        setTimeout(() => {
          axios
            .post('http://localhost:3001/artwork_images')
            .then(res => {
              this.setState({ files: res.data })
            })
            .catch(err => {
              console.log(err)
            })
        }, 3000)
      })
      .catch(err => {
        console.log(err)
      })
  }
  selectLogo = e => {
    const { value } = e.target
    this.setState({ logoType: value })
  }

  render() {
    const files = this.state.files
    return (
      <>
        <div className="adddiv">
          <h2>Select Artwork</h2>
        </div>
        <div className="templatesmain mat-lft-blk-menu" style={{ height: 550 }}>
          <div className="row ">
            <div className="col-md-12">
              <form className="form-horizontal">
                <span className="glyphicon glyphicon-search form-control-feedback serch-icon-left"></span>
                <input
                  type="text"
                  className="form-control seacrh-field-mat"
                  id=""
                  placeholder="Seacrh Art"
                />
              </form>
            </div>
            <div className="col-md-6 mt-15">
              <div className="form-group">
                <select
                  className="form-control clipart-selct slct-font-fam choose-your-size-drop"
                  defaultValue="Popoluar Clipart"
                  onChange={this.selectLogo}
                >
                  <option value="1">1 Color Logos</option>
                  <option value="2">2 Color Logos</option>
                  <option value="3">3 Color Logos</option>
                  <option value="4">4 Color Logos</option>
                  <option value="5">Practice circles</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mt-15">
              <div className="form-group">
                <a className="btn upld-img-btn" onClick={this.bindFileExplorer}>
                  Upload Image
                </a>
                <input
                  type="file"
                  multiple
                  className="custom-file-input"
                  id="customFile"
                  name="files"
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="row ">
            {this.state.logoType === '1' ? (
              <OneColorLogos addNewArtWork={this.addNewArtWork} />
            ) : (
              <div />
            )}
            {this.state.logoType === '2' ? (
              <TwoColorLogos addNewArtWork={this.addNewArtWork} />
            ) : (
              <div />
            )}
            {this.state.logoType === '3' ? (
              <ThreeColorLogos addNewArtWork={this.addNewArtWork} />
            ) : (
              <div />
            )}
            {this.state.logoType === '4' ? (
              <FourColorLogos addNewArtWork={this.addNewArtWork} />
            ) : (
              <div />
            )}
            {this.state.logoType === '5' ? (
              <PracticeCircles addNewArtWork={this.addNewArtWork} />
            ) : (
              <div />
            )}
          </div>
          <div className="row ">
            <ImageList files={files} addNewArtWork={this.addNewLogo} />
          </div>
        </div>
      </>
    )
  }
}

const setImageUrl = url => {
  return {
    type: 'SET_IMAGE_URL',
    image_url: url,
  }
}

const setComponentType = type => {
  return {
    type: 'SET_COMPONENT_TYPE',
    component_type: type,
  }
}
const mapStateToProps = state => {
  return {
    canvas: state.canvas,
  }
}

const mapDispatchToPropsForRect = dispatch => {
  return bindActionCreators({ setComponentType, setImageUrl }, dispatch)
}

const ArtworkToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToPropsForRect,
)(ArtworkToolbar)

class ArtworkToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById('mySidenav5').style.width = '0'
  }

  render() {
    return (
      <>
        <div
          id="artwrk"
          className="h100 second-menu fordeskview"
          style={{ display: 'none' }}
        >
          <ArtworkToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav5 formobview wo"
          id="mySidenav5"
        >
          <a
            style={{ color: '#fff' }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <ArtworkToolbarConnect />
        </div>
      </>
    )
  }
}

export default ArtworkToolSidebar

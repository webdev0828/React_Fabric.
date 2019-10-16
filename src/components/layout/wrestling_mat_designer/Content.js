import React from 'react'
import { connect } from 'react-redux'

const LeftSidebar = () => {
  return (
    <div className="row mar">
      <div className="col-md-12 thrd-nav">
        <ul className="nav navbar-nav navbar-right">
          <li className="active">
            <a href="/">Expand</a>
          </li>
          <li>
            <a href="/">Download</a>
          </li>
          <li>
            <a href="/">Share</a>
          </li>
          <li>
            <a href="/">Info</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

const MatsToolbar = () => {
  return (
    <div id="mats" className="second-menu">
      <div className="adddiv">
        <h2>Mats</h2>
      </div>
      <div className="matlist_main">
        <ul className="matlistul">
          <li>
            <span className="mat-caption">Royal Blue</span>
            <span className="mat-images">
              <img
                src={require('./../../../assets/img/rb1.jpg')}
                alt="Royal Blue"
              />
              <img
                src={require('./../../../assets/img/rb2.jpg')}
                alt="Royal Blue"
              />
              <img
                src={require('./../../../assets/img/rb3.jpg')}
                alt="Royal Blue"
              />
            </span>
          </li>
          <li>
            <span className="mat-caption">Red</span>
            <span className="mat-images">
              <img src={require('./../../../assets/img/red1.jpg')} alt="RED" />
              <img src={require('./../../../assets/img/red2.jpg')} alt="RED" />
              <img src={require('./../../../assets/img/red3.jpg')} alt="RED" />
            </span>
          </li>
          <li>
            <span className="mat-caption">Gold</span>
            <span className="mat-images">
              <img
                src={require('./../../../assets/img/gold1.jpg')}
                alt="Gold"
              />
              <img
                src={require('./../../../assets/img/gold2.jpg')}
                alt="Gold"
              />
              <img
                src={require('./../../../assets/img/gold3.jpg')}
                alt="Gold"
              />
            </span>
          </li>
          <li>
            <span className="mat-caption">Black</span>
            <span className="mat-images">
              <img
                src={require('./../../../assets/img/black1.jpg')}
                alt="Black"
              />
              <img
                src={require('./../../../assets/img/black2.jpg')}
                alt="Black"
              />
              <img
                src={require('./../../../assets/img/black3.jpg')}
                alt="Black"
              />
            </span>
          </li>
          <li>
            <span className="mat-caption">Gray</span>
            <span className="mat-images">
              <img
                src={require('./../../../assets/img/grey1.jpg')}
                alt="Grey"
              />
              <img
                src={require('./../../../assets/img/grey2.jpg')}
                alt="Grey"
              />
              <img
                src={require('./../../../assets/img/grey3.jpg')}
                alt="Grey"
              />
            </span>
          </li>
          <li>
            <span className="mat-caption">Light Green</span>
            <span className="mat-images">
              <img
                src={require('./../../../assets/img/green.jpg')}
                alt="Green"
              />
              <img
                src={require('./../../../assets/img/green2.jpg')}
                alt="Green"
              />
              <img
                src={require('./../../../assets/img/green3.jpg')}
                alt="Green"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const TemplatesToolbar = () => {
  return (
    <div id="template" className="second-menu" style={{ display: 'none' }}>
      <div className="adddiv">
        <h2>Templates</h2>
      </div>
      <div className="templatesmain">
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template1.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template2.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template3.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template4.jpg')}
              alt="Template"
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template5.jpg')}
              alt="Template"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template6.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template7.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template3.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template4.jpg')}
              alt="Template"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="temrows">
            <img
              src={require('./../../../assets/img/template5.jpg')}
              alt="Template"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const TextToolbar = () => {
  return (
    <div id="text" className="second-menu" style={{ display: 'none' }}>
      <div className="adddiv">
        <h2>Add Logo</h2>
        <div className="add-text-blk-hmenu">
          <div className="font-select">
            <div className="row row-border-btm">
              <div className="col-md-8 vrtcl-dot-line">
                <div className="form-group">
                  <select className="form-control slct-font-fam">
                    <option>Roboto</option>
                    <option>Oswald</option>
                    <option>Ralway</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <select className="form-control slct-font-size">
                    <option>16pt</option>
                    <option>16pt</option>
                    <option>16pt</option>
                    <option>16pt</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row-border-btm pt-15 pb-15">
              <div className="col-md-7 vrtcl-dot-line">
                <div className="font-stl-blk">
                  <button className="btn stl-btn">B</button>
                  <button className="btn stl-btn">
                    <i>I</i>
                  </button>
                  <button className="btn stl-btn">
                    <span>U</span>
                  </button>
                  <button className="btn stl-btn">AA</button>
                </div>
              </div>
              <div className="col-md-5">
                <div className="font-stl-blk">
                  <button className="btn stl-btn">
                    <img
                      src={require('./../../../assets/img/left-align.png')}
                    ></img>
                  </button>
                  <button className="btn stl-btn">
                    <img
                      src={require('./../../../assets/img/center-align.png')}
                    ></img>
                  </button>
                  <button className="btn stl-btn">
                    <img
                      src={require('./../../../assets/img/right-align.png')}
                    ></img>
                  </button>
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
                        max="100"
                        defaultValue="50"
                        className="range-slider"
                        id="line_ht_get"
                      ></input>
                    </div>
                  </div>
                  <div className="line-height-value">
                    <input
                      type="number"
                      id="line_ht_set"
                      className="btn ln-ht-val-btn"
                      defaultValue="50"
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
                        defaultValue="50"
                        className="range-slider"
                        id="spacing_get"
                      ></input>
                    </div>
                  </div>
                  <div className="spacing-value">
                    <input
                      type="number"
                      id="spacing_set"
                      className="btn spacing-val-btn"
                      defaultValue="50"
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
                    <button className="btn"> BLACK</button>
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
                        max="100"
                        defaultValue="50"
                        className="range-slider"
                        id="size_get"
                      ></input>
                    </div>
                  </div>
                  <div className="size-value">
                    <input
                      type="number"
                      id="size_set"
                      className="btn size-val-btn"
                      defaultValue="50"
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
                    <button className="btn green-btn">GREEN </button>
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
                    <button className="btn choose-btn">CHOOSE </button>
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
                        max="100"
                        defaultValue="50"
                        className="range-slider"
                        id="arc_get"
                      />
                    </div>
                  </div>
                  <div className="arc-value">
                    <input
                      type="number"
                      id="arc_set"
                      className="btn size-val-btn"
                      defaultValue="50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LogoToolbar = () => {
  return (
    <div id="logo" className="second-menu" style={{ display: 'none' }}>
      <div className="adddiv">
        <h2>Add Logo</h2>
        <img
          className="m10"
          src={require('./../../../assets/img/profile.jpg')}
          alt="Profile"
        />
        <img
          className="db"
          src={require('./../../../assets/img/lineimg.png')}
          alt="LINE"
        />
        <p>Upload your own images from computer</p>
        <small>
          <i>Accepted Files : SVG, JPG, JPEG, PNG</i>
        </small>
        <div className="crossdiv">
          <img
            className="pimg"
            src={require('./../../../assets/img/pimg.jpg')}
            alt="Profile"
          />
          <img
            className="pcross"
            src={require('./../../../assets/img/cross.png')}
            alt="cross"
          />
        </div>
      </div>
    </div>
  )
}

const EditContent = props => {
  const config = props.wrestling_config
  return (
    <>
      <div className="addcontdiv">
        <div className="inneraddcontdiv">
          <img
            src={require('./../../../assets/img/addlogobg.png')}
            alt="Template"
          />
          <p className="matsize">
            <span>
              MAT SIZE : {config.width}m x {config.height}m
            </span>
          </p>
        </div>
      </div>
      <div className="getquote">
        <div className="inline-btns">
          <p>
            <span className="gq">
              <a href="#">
                <img
                  src={require('./../../../assets/img/gqimg.png')}
                  alt="GET QUOTE"
                />{' '}
                Get a Quote
              </a>
            </span>
            <span className="cgrid">
              <a href="#">
                <img
                  src={require('./../../../assets/img/del.png')}
                  alt="Delete"
                />{' '}
                Clear Grid
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

class Content extends React.Component {
  render() {
    const wrestling_config = this.props.wrestling_config
    const components = this.props.components
    return (
      <div id="content">
        <div className="outer">
          <div className="inner bg-light lter">
            <LeftSidebar />
            <div className="row ml0 mar">
              <div className="col-md-3 col-sm-12 text-center h100 pad0 mtopneg">
                <MatsToolbar />
                <TemplatesToolbar />
                <TextToolbar />
                <LogoToolbar />
              </div>
              <div className="col-md-8 col-sm-12 text-center pad0">
                <EditContent
                  wrestling_config={wrestling_config}
                  components={components}
                />
              </div>
              {/* <div className="col-md-1 col-sm-12 text-center pad0 h7">
                <RightToolbar />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    wrestling_config: state.wrestling_config,
  }
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ , setCanvasConfig }, dispatch)
// }

const ContentConnect = connect(mapStateToProps)(Content)

export default ContentConnect

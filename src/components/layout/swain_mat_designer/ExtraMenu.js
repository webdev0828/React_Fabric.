import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

class ExtraMenu extends React.Component {
  componentDidMount = () => {}
  download = e => {
    e.preventDefault()
    let download = document.createElement('a')
    download.href = this.props.canvas.toDataURL()
    download.download = 'mypainting.png'
    download.click()
  }

  menuToggle = () => {
    let bodyClass = $('body').attr('class')
    if (
      bodyClass === undefined ||
      bodyClass.indexOf('sidebar-left-opened') < 0
    ) {
      $('body').addClass('sidebar-left-opened')
    } else {
      $('body').removeClass('sidebar-left-opened')
    }
  }
  render() {
    return (
      <>
        <div className="row mar">
          <div className="col-md-12 thrd-nav">
            <ul className="nav navbar-nav navbar-right fordeskview">
              <li className="active">
                <a href="/">Expand</a>
              </li>
              <li>
                <a onClick={this.download}>Download</a>
              </li>
              <li>
                <a href="/">Share</a>
              </li>
              <li>
                <a href="/">Info</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right formobview mobul">
              <li>
                <a href="/">
                  <img
                    src={require('./../../../assets/img/expand.png')}
                    alt="EXPAND"
                  />
                </a>
              </li>
              <li>
                <a onClick={this.download}>
                  <img
                    src={require('./../../../assets/img/download.png')}
                    alt="DOWNLOAD"
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src={require('./../../../assets/img/share.png')}
                    alt="SHARE"
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src={require('./../../../assets/img/info.png')}
                    alt="INFO"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mar sectogglebtn formobview">
          <a
            data-placement="bottom"
            data-original-title="Show/Hide"
            data-toggle="tooltip"
            className="btn btn-sm toggle-left"
            id="menu-toggle"
            onClick={() => this.menuToggle()}
          >
            <img src={require('./../../../assets/img/menu.png')} alt="MENU" />
          </a>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
  }
}

const ExtraMenuConnect = connect(mapStateToProps)(ExtraMenu)

export default ExtraMenuConnect

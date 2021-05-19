import React from 'react'
import $ from 'jquery'

class Sidebar extends React.Component {
  componentDidMount = () => {
    $('#menu li.nav.mats').addClass('active')
  }

  setActiveToolbar = e => {
    e.preventDefault()
    let target = $(e.target).attr('data-target')
    $('.second-menu').hide()
    $('#' + target).show()
    $(`#menu li.nav.active`).removeClass('active')
    $(`#menu li.nav.${target}`).addClass('active')
  }

  openNav1 = () => {
    document.getElementById('mySidenav1').style.width = '300px'
  }

  openNav2 = () => {
    document.getElementById('mySidenav2').style.width = '250px'
  }

  openNav3 = () => {
    document.getElementById('mySidenav3').style.width = '250px'
  }

  openNav4 = () => {
    document.getElementById('mySidenav4').style.width = '250px'
  }

  openNav5 = () => {
    document.getElementById('mySidenav5').style.width = '250px'
  }

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
                  src={require('./../../../assets/img/mats.png')}
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

            <li className="nav color">
              <a
                href="#"
                data-target="color"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require('./../../../assets/img/color.png')}
                  data-target="color"
                  onClick={this.setActiveToolbar}
                  style={{ width: '30px' }}
                  alt="color"
                />
                <span
                  className="link-title"
                  data-target="color"
                  onClick={this.setActiveToolbar}
                >
                  Select Color
                </span>
              </a>
            </li>

            <li className="nav circle">
              <a
                href="#"
                data-target="circle"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require('./../../../assets/img/circle.png')}
                  data-target="circle"
                  onClick={this.setActiveToolbar}
                  alt="Circle"
                />
                <span
                  className="link-title"
                  data-target="circle"
                  onClick={this.setActiveToolbar}
                >
                  Add Circle
                </span>{' '}
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
                  src={require('./../../../assets/img/addtext.png')}
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
                </span>{' '}
              </a>
            </li>

            <li className="nav artwrk">
              <a
                href="#"
                data-target="artwrk"
                className="leftMenu"
                onClick={this.setActiveToolbar}
              >
                <img
                  className="blk"
                  src={require('./../../../assets/img/artwork.png')}
                  data-target="artwrk"
                  onClick={this.setActiveToolbar}
                  alt="Add artwrk"
                />
                <span
                  className="link-title"
                  data-target="artwrk"
                  onClick={this.setActiveToolbar}
                >
                  Add Artwork
                </span>
              </a>
            </li>
          </ul>
          <ul id="menu" className="bg-blue dker formobview">
            <li className="nav-divider"></li>
            <li onClick={() => this.openNav1()}>
              <a href="#" data-target="mats" className="leftMenu">
                <img
                  className="blk"
                  src={require('./../../../assets/img/mats.png')}
                  alt="Mats"
                />
                <span className="link-title">&nbsp;Mats</span>
              </a>
            </li>

            <li onClick={() => this.openNav2()}>
              <a href="#" data-target="color" className="leftMenu">
                <img
                  className="blk"
                  src={require('./../../../assets/img/templates.png')}
                  alt="color"
                />
                <span className="link-title">Select Color</span>
              </a>
            </li>
            <li onClick={() => this.openNav3()}>
              <a href="#" data-target="circle" className="leftMenu">
                <img
                  className="blk"
                  src={require('./../../../assets/img/circle.png')}
                  alt="Text"
                  style={{ width: '24px' }}
                />
                <span className="link-title">Add Circle</span>{' '}
              </a>
            </li>
            <li onClick={() => this.openNav4()}>
              <a href="#" data-target="circle" className="leftMenu">
                <img
                  className="blk"
                  src={require('./../../../assets/img/addtext.png')}
                  alt="Text"
                />
                <span className="link-title">Add Text</span>{' '}
              </a>
            </li>
            <li onClick={() => this.openNav5()}>
              <a href="#" data-target="artwrk" className="leftMenu">
                <img
                  className="blk"
                  src={require('./../../../assets/img/artwork.png')}
                  style={{ width: '30px' }}
                  alt="Add artwrk"
                />
                <span className="link-title">Add Artwork</span>
              </a>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

export default Sidebar

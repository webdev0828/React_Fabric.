import React from 'react'
import $ from 'jquery'

class Sidebar extends React.Component {
  setActiveToolbar = e => {
    let target = $(e.target).attr('data-target')
    $('.second-menu').hide()
    $('#' + target).show()
    $(`#menu li.nav.active`).removeClass('active')
    $(`#menu li.nav.${target}`).addClass('active')
  }
  render() {
    return (
      <div id="left">
        <ul id="menu" className="bg-blue dker">
          <li className="nav-divider"></li>
          <li className="nav mats">
            <a
              href="#"
              data-target="mats"
              className="leftMenu"
              onClick={this.setActiveToolbar}
            >
              <img
                className="blk"
                data-target="mats"
                src={require('./../../../assets/img/mats.png')}
                alt="Mats"
              />
              <span className="link-title" data-target="mats">
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
                data-target="template"
                src={require('./../../../assets/img/templates.png')}
                alt="Templates"
              />
              <span className="link-title" data-target="template">
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
                data-target="text"
                src={require('./../../../assets/img/addtext.png')}
                alt="Text"
              />
              <span className="link-title" data-target="text">
                Add Text
              </span>{' '}
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
                data-target="logo"
                src={require('./../../../assets/img/addlogo.png')}
                alt="Add Logo"
              />
              <span className="link-title" data-target="logo">
                Add Logo
              </span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Sidebar

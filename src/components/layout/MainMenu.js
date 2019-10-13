import React from 'react'

class TopMenu extends React.Component {
  render() {
    return (
      <div id="top">
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <header className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </header>

            <div className="topnav">
              <small>
                For Info, Call our Sales Team @{' '}
                <a href="tel:800.520.7647">800.520.7647</a>
              </small>
            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav">
                <li className="">
                  <a href="dashboard.html">Wrestling</a>
                </li>
                <li>
                  <a href="/">Martials Arts & MMA</a>
                </li>
                <li>
                  <a href="/">Fitness & Gym</a>
                </li>
                <li>
                  <a href="/">Gymnastics</a>
                </li>
                <li>
                  <a href="/">Cheerleading</a>
                </li>
                <li>
                  <a href="/">Yoga & Pilates</a>
                </li>
                <li>
                  <a href="/">Indoor Sports Turf</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="sec-mega-nav default-left">
          <div className="container">
            <ul className="nav navbar-nav navbar-center">
              <li className="active">
                <a href="/">WRESTLING MAT DESIGNER</a>
              </li>
              <li>
                <a href="/">SWAIN MAT DESIGNER</a>
              </li>
              <li>
                <a href="/">WALL PAD DESIGNER</a>
              </li>
              <li>
                <a href="/">MARTIAL ARTS AND FITNESS DESIGNER</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default TopMenu

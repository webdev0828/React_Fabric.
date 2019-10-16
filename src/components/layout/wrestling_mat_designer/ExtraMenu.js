import React from 'react'

class ExtraMenu extends React.Component {
  render() {
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
}

export default ExtraMenu

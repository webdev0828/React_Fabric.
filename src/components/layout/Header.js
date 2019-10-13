import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div className="see-instruction">
        <div className="container">
          <div className="left-cap default-left">
            <small>Home - DesignLab v5</small>
            <h1>
              <span>See Instructions Below</span>{' '}
              <img
                className="fr"
                src={require('./../../assets/img/logo.png')}
                alt="LOGO"
              />
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Header

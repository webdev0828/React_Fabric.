import React from 'react'
import '../assets/css/bootstrap.css'
import '../assets/css/fontawesome.css'
import '../assets/css/wrestling.css'
import '../assets/css/metisMenu.css'
import '../assets/css/onoffcanvas.css'

class HomePage extends React.Component {
  render() {
    return (
      <div
        className="see-instruction int-matbuild default-left wallpad"
        style={{ paddingBottom: '200px' }}
      >
        <div className="container">
          <div className="innerint default-left text-center">
            <h2>Interactive Design Builder</h2>
            <p>You can build the various design.</p>
          </div>
          <div className="default-left back-fwd-btns">
            <div className="row">
              <div className="default-left entertxt text-center">
                <p>
                  For odd shaped rooms, put in your best <br />
                  guess of the area & speak to one of our mat experts for a{' '}
                  <br /> more accurate idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './../../assets/css/fontawesome.css'
import $ from 'jquery'

const QuoteModal = props => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <span className="gq">
        <a onClick={handleShow}>
          <img src={require('./../../assets/img/gqimg.png')} alt="GET QUOTE" />{' '}
          Get a Quote
        </a>
      </span>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="modalRegisterForm"
      >
        <div className="modal-header text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title w-100 font-weight-bold">GET A QUOTE</h4>
          <p className="modal-title w-100 font-weight-bold">
            If you have question, please call us or email us.
          </p>
        </div>
        <div className="modal-body mx-3">
          <div className="md-form mb-5">
            <input
              type="text"
              id="orangeForm-name"
              className="form-control validate"
              placeholder="Your Full Name"
            />
            <i className="far fa-edit"></i>
          </div>
          <div className="md-form mb-5">
            <input
              type="email"
              id="orangeForm-email"
              className="form-control validate"
              placeholder="Your Email Address"
            />
            <i className="far fa-envelope" aria-hidden="true"></i>
          </div>

          <div className="md-form mb-5">
            <input
              type="phone"
              id="orangeForm-phone"
              className="form-control validate"
              placeholder="Your Phone Number"
            />
            <i className="fa fa-phone" aria-hidden="true"></i>
          </div>

          <div className="md-form mb-5">
            <input
              type="text"
              id="orangeForm-zipcode"
              className="form-control validate"
              placeholder="Delivery Zip Code"
            />
            <i className="fa fa-braille" aria-hidden="true"></i>
          </div>

          <div className="md-form mb-5">
            <input
              type="text"
              id="orangeForm-subject"
              className="form-control validate"
              placeholder="Your Subject"
            />
            <i className="fas fa-edit" aria-hidden="true"></i>
          </div>

          <div className="md-form mb-5">
            <textarea
              className="form-control validate"
              rows="3"
              col="30"
              placeholder="Your Message"
              id="orangeForm-message"
            ></textarea>
            <i className="far fa-comments" aria-hidden="true"></i>
          </div>

          <button
            className="btn btn-deep-orange"
            onClick={() => {
              props.sendQuote(
                $('#orangeForm-name').val(),
                $('#orangeForm-email').val(),
                $('#orangeForm-phone').val(),
                $('#orangeForm-zipcode').val(),
                $('#orangeForm-subject').val(),
                $('#orangeForm-message').val(),
              )
              handleClose()
            }}
            style={{ marginTop: '15px' }}
          >
            Submit
          </button>
        </div>

        <div className="modal-footer d-flex justify-content-center">
          <p className="modal-title w-100" style={{ textAlign: 'center' }}>
            Thank you for contacting Dollamur Sport Surfaces with your Request
            for Quote. We value your business adn will contact you as soon as
            possible with a FREE Design Quote. Please include any specific
            information in the Message section below.
          </p>

          <p className="modal-title w-100" style={{ textAlign: 'center' }}>
            if you have questions, please call U.S.:{' '}
            <a href="tel:877-790-2108">877-790-2108</a>, I Intl:{' '}
            <a href="+1 954 643 0850">+1 954 643 0850</a> or <br />
            email us <a href="mailto:sales@dollamur.com">sales@dollamur.com</a>.
          </p>
        </div>
      </Modal>
    </>
  )
}
export default QuoteModal

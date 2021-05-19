import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./../../assets/css/fontawesome.css";
import $ from "jquery";

const SaveModal = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a href="#" onClick={handleShow}>
        <img src={require("./../../assets/img/save.png")} alt="SAVE" />
        <span>Save Design</span>
      </a>
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
          <h4 className="modal-title w-100 font-weight-bold">
            SAVE YOUR DESIGN
          </h4>
          <p className="modal-title w-100 font-weight-bold">
            Save your design to use later, then share it with via email.
          </p>
        </div>
        <div className="modal-body mx-3">
          <div className="md-form mb-5">
            <input
              type="text"
              id="orangeForm-name"
              className="form-control validate"
              placeholder="Name of your design"
              defaultValue="first design"
            />
            <i className="far fa-edit"></i>
          </div>
          <div className="md-form mb-5">
            <input
              type="email"
              id="orangeForm-email"
              className="form-control validate"
              placeholder="Your Email Address"
              defaultValue="upworkbuyer@outlook.com"
            />
            <i className="far fa-envelope" aria-hidden="true"></i>
          </div>
          <button
            className="btn btn-deep-orange"
            onClick={() => {
              props.save(
                $("#orangeForm-name").val(),
                $("#orangeForm-email").val()
              );
              handleClose();
            }}
            style={{ marginTop: "15px" }}
          >
            Submit
          </button>
        </div>
        <div className="modal-footer d-flex justify-content-center"></div>
      </Modal>
    </>
  );
};
export default SaveModal;

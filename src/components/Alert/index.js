import React from 'react';
import Modal from 'react-bootstrap/Modal';

const Alert = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Error !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Fail to load data. Please try fresh page again</p>
    </Modal.Body>
  </Modal>
);

export default Alert;

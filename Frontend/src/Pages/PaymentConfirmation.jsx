import React from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentConfirmation = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Enter your 4-digit card pin to confirm this payment</h2>
        <div className="pin-input d-flex justify-content-center my-3">
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="pin-digit"
              style={{ width: "40px", textAlign: "center", margin: "0 5px" }}
            />
          ))}
        </div>
        <p className="privacy-text text-center">
          Your personal data will be used to process your card, support your experience on this website, and for other purposes described in our privacy policy.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} style={{ backgroundColor: "#000", color: "#fff" }}>
          Confirm Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentConfirmation;

import { ModalBody } from "flowbite-react";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function PaymentConfirmation() {
  const [isModalOpen, setIsModalOpen] = useState(true);


  const openModal = ()=>{
    setIsModalOpen(true)
  }
  return (
    <div className="App">
      {isModalOpen && (
        <div className="background-blurred">
          {/* Modal Content */}
          <div className="modal">
            <h2>Enter your 4-digit card pin to confirm this payment</h2>
            <div className="pin-input">
              <input type="text" maxLength="1" />
              <input type="text" maxLength="1" />
              <input type="text" maxLength="1" />
              <input type="text" maxLength="1" />
            </div>
            <button className="confirm-button" onClick={openModal}>Confirm Payment</button>
            <p className="privacy-text">
              Your personal data will be used to process your card, support your
              experience on this website, and for other purposes described in
              our privacy policy.
            </p>
          </div>
        </div>
      )}


    <Modal >
        <Modal.Header closeButton>

        </Modal.Header>

        <ModalBody>
        <h2>Enter your 4-digit card pin to confirm this payment</h2>
            <div className="pin-input">
               
            </div>
            <button className="confirm-button">Confirm Payment</button>

        </ModalBody>


    </Modal>
    </div>
    

  
  );
}

export default PaymentConfirmation;

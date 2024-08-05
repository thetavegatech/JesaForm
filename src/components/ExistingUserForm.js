import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import AAPLlogo from "../assets/img.png";
import logo from "../assets/img1.jpeg";
import Modal from "./Modal"; // Import your custom modal component

const ExistingUserForm = () => {
  const [initialFormData, setInitialFormData] = useState({
    name: "",
    phone: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    source: "",
    members: [],
    occupation: "",
    age: "",
    gender: ""
  });
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [statusButtonsVisible, setStatusButtonsVisible] = useState(false);
  const [scannedUserName, setScannedUserName] = useState("")

  const handleInitialChange = (e) => {
    setInitialFormData({
      ...initialFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, phone } = initialFormData;
      const response = await axios.get(`http://localhost:4000/api/customer/by-name-phone`, {
        params: { name, phone }
      });
      const customer = response.data;

      setFormData(customer);
      setQrCodeUrl(customer.qrCodeUrl);
      setScannedUserName(customer.name);
      setModalIsOpen(true);
    } catch (error) {
      alert("Error fetching customer data");
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await axios.patch(`http://localhost:4000/api/customers/${formData._id}`, {
        status
      });
      alert(`Status updated to ${status}`);
      setStatusButtonsVisible(false);
      setModalIsOpen(false);
    } catch (error) {
      alert("Error updating status");
    }
  };

  const handleQrCodeScanned = () => {
    setStatusButtonsVisible(true);
  };

  return (
    <div className="form-container">
      <header className="header">
        <img src={AAPLlogo} alt="Header" className="header-image" />
        <div className="logo-container">
          <img src={logo} alt="Logo" className="header-logo" />
        </div>
        <div className="header-middle">
          <h1>IBIZ Registration Form</h1>
        </div>
      </header>

      <form onSubmit={handleInitialSubmit} className="initial-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={initialFormData.name}
              onChange={handleInitialChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone No:
            <input
              type="text"
              name="phone"
              value={initialFormData.phone}
              onChange={handleInitialChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Get Data
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        
        <h2>User Name: {scannedUserName} QR Code</h2>
        <h2>Save screenshot for Entry</h2>
        <div className="qr-code-container">
          <img src={qrCodeUrl} alt="Customer QR Code" className="qr-code-image" onLoad={handleQrCodeScanned} />
          {/* <p>Scan the QR Code</p> */}
          {statusButtonsVisible && (
            <>
              {/* <button onClick={() => handleStatusUpdate("OK")}>In</button>
              <button onClick={() => handleStatusUpdate("Close")}>Out</button> */}
            </>
          )}
        </div>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ExistingUserForm;

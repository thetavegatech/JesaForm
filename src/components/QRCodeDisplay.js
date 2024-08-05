// src/components/QRCodeScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './scanner.css'; // Ensure you have corresponding CSS for styling

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Handle QR code scan result
  const handleScan = async (data) => {
    if (data) {
      try {
        // Fetch customer details by QR code data
        const response = await axios.get(`http://localhost:4000/api/customer/details`, {
          params: { qrCode: data }
        });
        setDetails(response.data);
        setScanResult(data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error('Error fetching customer details:', err);
      }
    }
  };

  // Handle QR code scan error
  const handleError = (error) => {
    setError('Error scanning QR code');
    console.error('Error scanning QR code:', error);
  };

  // Handle status update
  const handleUpdateStatus = async () => {
    if (details) {
      try {
        await axios.post(`http://localhost:4000/api/customer/update-status`, {
          qrCode: scanResult,
          status
        });
        alert('Status updated successfully');
      } catch (err) {
        alert('Error updating status');
        console.error('Error updating status:', err);
      }
    }
  };

  return (
    <div className="scanner-container">
      <h1>QR Code Scanner</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result.text);
          }
          if (error) {
            handleError(error);
          }
        }}
        style={{ width: '100%' }}
      />

      {error && <p className="error-message">{error}</p>}

      {details && (
        <div className="details-container">
          <h2>Customer Details</h2>
          <pre>{JSON.stringify(details, null, 2)}</pre>

          <div className="status-update">
            <label>
              Update Status:
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-input"
              />
            </label>
            <button onClick={handleUpdateStatus} className="update-btn">
              Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;

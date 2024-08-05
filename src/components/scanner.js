import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './scanner.css';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async (data) => {
    console.log('QR Code Data:', data);
    if (data) {
      try {
        const response = await axios.get('http://localhost:4000/api/customer/by-qrcode', {
          params: { qrCodeData: data }
        });
        setDetails(response.data);
        setScanResult(data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error('Error fetching customer details:', err);
      }
    }
  };

  const handleError = (error) => {
    setError('Error scanning QR code');
    console.error('Error scanning QR code:', error);
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
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;

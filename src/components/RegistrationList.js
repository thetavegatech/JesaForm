import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegistrationList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        alert('Error fetching data');
      }
    };

    fetchCustomers();
  }, []);

  const printCustomer = (customer) => {
    const members = Array.isArray(customer.members) ? customer.members : [];
    
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
          .print-container { padding: 20px; max-width: 800px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px; background: #f9f9f9; }
          .print-header { text-align: center; margin-bottom: 20px; }
          .print-header .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .print-header .header-logo img { width: 100px; }
          .print-header .header-title h1 { font-size: 24px; margin: 0; }
          .print-header .header-title h2 { font-size: 18px; margin: 0; color: #666; }
          .print-header .header-middle h3 { font-size: 16px; margin: 20px; margin-bottom: 10px; color: #444; }
          .print-details { margin-top: 20px; }
          .print-details p { font-size: 14px; line-height: 1.6; margin: 5px 0; }
          .print-details p strong { color: #000; }
          .print-details .qr-code img { max-width: 100px; }
          .members-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .members-table th, .members-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .members-table th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <div class="header-top">
              <div class="header-logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdY4U3hWMpmts0iOuvPulvNNr-af-zy85dgQ&s" alt="Left Logo" />
              </div>
              <div class="header-title">
                <h1>Jain Engineer's Society Aurangabad</h1>
                <h2>JESA JESA-Nx</h2>
              </div>
              <div class="header-logo">
                <img src="https://via.placeholder.com/100" alt="Right Logo" />
              </div>
            </div>
            <div class="header-middle">
              <h3>Startup Edge: Mastering AI-Driven Video Creation</h3>
            </div>
          </div>
          <div class="print-details">
            <h4><strong>Name:</strong> ${customer.name}</h4>
            <h4><strong>Place:</strong> ${customer.place}</h4>
            <h4><strong>Phone:</strong> ${customer.phone}</h4>
            <h4><strong>Source:</strong> ${customer.source}</h4>
            <h4><strong>Occupation:</strong> ${customer.occupation}</h4>
            <p class="qr-code"><strong>Customer QR Code:</strong><br/><img src="${customer.qrCodeUrl}" alt="Customer QR Code" /></p>
            ${members.length > 0 ? `
              <h4><strong>Members:</strong></h4>
              <table class="members-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Occupation</th>
                    <th>Source</th>
                    <th>Place</th>
                    <th>Status</th>
                    <th>QR Code</th>
                  </tr>
                </thead>
                <tbody>
                  ${members.map(member => `
                    <tr>
                      <td>${member.name}</td>
                      <td>${member.age}</td>
                      <td>${member.occupation}</td>
                      <td>${member.source}</td>
                      <td>${member.place}</td>
                      <td>${member.status}</td>
                      <td><img src="${member.qrCodeUrl}" alt="Member QR Code" style="max-width: 50px;" /></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const printAllCustomers = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print All</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
          .print-container { padding: 20px; max-width: 800px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px; background: #f9f9f9; }
          .print-header { text-align: center; margin-bottom: 20px; }
          .print-header .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .print-header .header-logo img { width: 100px; }
          .print-header .header-title h1 { font-size: 24px; margin: 0; }
          .print-header .header-title h2 { font-size: 18px; margin: 0; color: #666; }
          .print-header .header-middle h3 { font-size: 16px; margin: 0; color: #444; }
          .print-details { margin-top: 20px; }
          .print-details p { font-size: 14px; line-height: 1.6; margin: 5px 0; }
          .print-details p strong { color: #000; }
          .print-details .qr-code img { max-width: 100px; }
          .customer-item { margin-bottom: 20px; }
          .members-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .members-table th, .members-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .members-table th { background-color: #f4f4f4; }
          .customer-item .qr-code img { max-width: 100px; }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <div class="header-top">
              <div class="header-logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdY4U3hWMpmts0iOuvPulvNNr-af-zy85dgQ&s" alt="Left Logo" />
              </div>
              <div class="header-title">
                <h1>Jain Engineer's Society Aurangabad</h1>
                <h2>JESA JESA-Nx</h2>
              </div>
              <div class="header-logo">
                <img src="https://via.placeholder.com/100" alt="Right Logo" />
              </div>
            </div>
            <div class="header-middle">
              <h3>Startup Edge: Mastering AI-Driven Video Creation</h3>
            </div>
          </div>
          <div class="print-details">
            ${customers.map(customer => {
              const members = Array.isArray(customer.members) ? customer.members : [];
              return `
                <div class="customer-item">
                  <p><strong>Name:</strong> ${customer.name}</p>
                  <p><strong>Place:</strong> ${customer.place}</p>
                  <p><strong>Phone:</strong> ${customer.phone}</p>
                  <p><strong>Source:</strong> ${customer.source}</p>
                  <p><strong>Occupation:</strong> ${customer.occupation}</p>
                  <p class="qr-code"><strong>Customer QR Code:</strong><br/><img src="${customer.qrCodeUrl}" alt="Customer QR Code" /></p>
                  ${members.length > 0 ? `
                    <h4><strong>Members:</strong></h4>
                    <table class="members-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Occupation</th>
                          <th>Source</th>
                          <th>Place</th>
                          <th>Status</th>
                          <th>QR Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${members.map(member => `
                          <tr>
                            <td>${member.name}</td>
                            <td>${member.age}</td>
                            <td>${member.occupation}</td>
                            <td>${member.source}</td>
                            <td>${member.place}</td>
                            <td>${member.status}</td>
                            <td><img src="${member.qrCodeUrl}" alt="Member QR Code" style="max-width: 50px;" /></td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  ` : ''}
                  <hr />
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="list-container">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdY4U3hWMpmts0iOuvPulvNNr-af-zy85dgQ&s" alt="Left Logo" />
            </div>
            <div className="header-title">
              <h1>Jain Engineer's Society Aurangabad</h1>
              <h2>JESA JESA-Nx</h2>
            </div>
            <div className="header-logo">
              <img src="/path-to-your-right-logo.png" alt="Right Logo" />
            </div>
          </div>
          <div className="header-middle">
            <h3>Startup Edge: Mastering AI-Driven Video Creation</h3>
          </div>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Members</th>
            <th>Occupation</th>
            <th>QR Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.place}</td>
              <td>{customer.phone}</td>
              <td>{customer.source}</td>
              <td>
                {Array.isArray(customer.members) && customer.members.length > 0
                  ? customer.members.map(member => member.name).join(', ')
                  : 'No Members'}
              </td>
              <td>{customer.occupation}</td>
              <td>
                <img src={customer.qrCodeUrl} alt="Customer QR Code" style={{ maxWidth: '50px' }} />
              </td>
              <td>
                <button onClick={() => printCustomer(customer)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .list-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
          color: #333;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        img {
          max-width: 50px;
          height: auto;
        }
        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default RegistrationList;

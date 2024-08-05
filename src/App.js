import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';
import ExistingUserForm from './components/ExistingUserForm';
import Scanner from './components/scanner'; // Ensure correct capitalization
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/list" element={<RegistrationList />} />
        <Route path="/existing-user" element={<ExistingUserForm />} />
        <Route path="/scanner" element={<Scanner />} /> {/* Ensure route matches component name */}
      </Routes>
    </Router>
  );
};

export default App;

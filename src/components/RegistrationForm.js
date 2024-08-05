import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import AAPLlogo from "../assets/img.png";
import logo from "../assets/img1.jpeg";
import thetavge from "../assets/thetavega.jpeg";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    phone: "",
    source: "",
    members: [], // Initialize as an array
    occupation: "",
    age: 0,
    gender: "",
    member: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newMembers = prevFormData.members.map((member, i) =>
        i === index ? { ...member, [name]: value } : member
      );
      return { ...prevFormData, members: newMembers };
    });
  };

  const addMember = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, {  name: "",
        place: "",
        phone: "",
        source: "",
        occupation: "",
        age: 0,
        gender: "",
        member: "",}],
    }));
  };

  const removeMember = (index) => {
    setFormData((prevFormData) => {
      const newMembers = prevFormData.members.filter((_, i) => i !== index);
      return { ...prevFormData, members: newMembers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post(
        "http://localhost:4000/api/customers",
        formData
      );
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        place: "",
        phone: "",
        source: "",
        members: [],
        occupation: "",
        age: 0,
        gender: "",
        member: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error submitting form");
    }
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
        <div className="header-middle">
          <Link to={`/existing-user`} className="existing-user-link">
            <h3>If Already Registered Click Here</h3>
          </Link>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="registration-form">
      <fieldset className="gender-fieldset">
          <legend>Jesa Member:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="Yes"
              // checked={formData.gender === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="No"
              // checked={formData.gender === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </fieldset>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <fieldset className="gender-fieldset">
          <legend>Gender:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </fieldset>
        <label>
          Place:
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            // required
          />
        </label>
        <label>
          Phone No:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Occupation:
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            // required
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Business">Business</option>
            <option value="Job">Job</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Where you got to know about IBiz:
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            // required
          >
            <option value="">Select</option>
            <option value="Social Media">Social Media</option>
            <option value="Friend">Friend</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Event">Event</option>
            <option value="FM">FM</option>
          </select>
        </label>
        <label>
          Members with you:
          <input
            type="number"
            name="member"
            value={formData.member}
            onChange={handleChange}
            // required
          />
        </label>
        
        
        <button type="button" onClick={addMember} className="submit-btn">
          Add Member
        </button>
        {formData.members.map((member, index) => (
          <div key={index} className="member-section">
            <h3>Jesa Member {index + 1}</h3>
            
            <label>
              Member Name:
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
            </label>
            <fieldset className="gender-fieldset">
          <legend>Gender:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </fieldset>
            <label>
              Member Age:
              <input
                type="number"
                name="age"
                value={member.age}
                onChange={(e) => handleMemberChange(index, e)}
                // required
              />
            </label>
            <label>
              Member Occupation:
              <select
                name="occupation"
                value={member.occupation}
                onChange={(e) => handleMemberChange(index, e)}
                // required
              >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Business">Business</option>
                <option value="Job">Job</option>
                <option value="Other">Other</option>
              </select>
            </label>
            {/* <label>
              Member Source:
              <select
                name="source"
                value={member.source}
                onChange={(e) => handleMemberChange(index, e)}
                required
              >
                <option value="">Select</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Event">Event</option>
                <option value="FM">FM</option>
              </select>
            </label> */}
            {/* <label>
              Member Place:
              <input
                type="text"
                name="place"
                value={member.place}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
            </label> */}
            {/* <label>
              Member Status:
              <input
                type="text"
                name="status"
                value={member.status}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
            </label> */}
            <button
              type="button"
              onClick={() => removeMember(index)}
              className="submit-btn"
            >
              Remove Member
            </button>
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <img src={thetavge} alt="Logo" className="" style={{ height: "30px", width: "25px"}}/>
      <h3 style={{ color: 'orange', marginTop: "10px" }}> Thetavega Tech</h3>
    </div>
  );
};

export default RegistrationForm;

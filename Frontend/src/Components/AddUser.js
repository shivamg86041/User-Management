// AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    howDidYouHear: [],
    city: '',
    state: '',
  });

  const handleCancelEdit = ()=>{
    navigate('/dashboard');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is a checkbox, handle multiple selections
    if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked;
      setUserData((prevData) => ({
        ...prevData,
        [name]: isChecked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/AddUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User added successfully');
        navigate('/dashboard')
      } else {
        console.error('Error adding user:', response.statusText);
        // Handle error, display error message, etc.
      }
    } catch (error) {
      console.error('Error adding user:', error.message);
      // Handle other errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={userData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Phone:
        <input type="tel" name="phone" value={userData.phone} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender:
        <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
        <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
        <input type="radio" name="gender" value="Others" onChange={handleChange} /> Others
      </label>
      <br />
      <label>
        How did you hear about this?
        <input
          type="checkbox"
          name="howDidYouHear"
          value="LinkedIn"
          onChange={handleChange}
        /> LinkedIn
        <input
          type="checkbox"
          name="howDidYouHear"
          value="Friends"
          onChange={handleChange}
        /> Friends
        <input
          type="checkbox"
          name="howDidYouHear"
          value="Job Portal"
          onChange={handleChange}
        /> Job Portal
        <input
          type="checkbox"
          name="howDidYouHear"
          value="Others"
          onChange={handleChange}
        /> Others
      </label>
      <br />
      <label>
        City:
        <select name="city" value={userData.city} onChange={handleChange}>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </label>
      <br />
      <label>
        State:
        <input type="text" name="state" value={userData.state} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancelEdit}>Cancel</button>
    </form>
  );
};

export default AddUser;

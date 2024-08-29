import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    source: [],
    city: '',
    state: '',
    password: '',
  });


  const [suggestedStates, setSuggestedStates] = useState(['Gujarat', 'Maharashtra', 'Karnataka']);
  const [filteredStates, setFilteredStates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Filter suggested states based on user input
    const filtered = suggestedStates.filter((state) =>
      state.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  const handleStateSelect = (selectedState) => {
    setFormData({ ...formData, state: selectedState });
    setFilteredStates([]); // Clear the filtered suggestions
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      source: prevData.source.includes(value)
        ? prevData.source.filter((source) => source !== value)
        : [...prevData.source, value],
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${BASE_URL}api/users', formData);
      console.log(response.data);
      navigate('/login')
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <>
    <p className='loginbtn'>
        Already have an account?{' '}
        <Link to="/login" className="login-link">
          <button className="login-button">Login</button>
        </Link>
      </p>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} pattern="[A-Za-z ]+" required />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          minLength="6"
          required
        />
      </label>
      <br />
      
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]+" required />
      </label>
      <br />

      <label>
        Gender:
        <label>
          <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
          Female
        </label>
        <label>
          <input type="radio" name="gender" value="Others" checked={formData.gender === 'Others'} onChange={handleChange} />
          Others
        </label>
      </label>
      <br />

      <label>
        How did you hear about this?
        <label>
          <input type="checkbox" name="LinkedIn" checked={formData.sources && formData.sources.includes('LinkedIn')} onChange={handleCheckboxChange} />
          LinkedIn
        </label>
        <label>
          <input type="checkbox" name="Friends" checked={formData.sources && formData.sources.includes('LinkedIn')} onChange={handleCheckboxChange} />
          Friends
        </label>
        <label>
          <input type="checkbox" name="JobPortal" checked={formData.sources && formData.sources.includes('LinkedIn')} onChange={handleCheckboxChange} />
          Job Portal
        </label>
        <label>
          <input type="checkbox" name="Others" checked={formData.sources && formData.sources.includes('LinkedIn')} onChange={handleCheckboxChange} />
          Others
        </label>
      </label>
      <br />

      <label>
        City:
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </label>
      <br />

      <label>
        State:
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Start typing to search..."
        />
        <ul>
          {filteredStates.map((state) => (
            <li key={state} onClick={() => handleStateSelect(state)}>
              {state}
            </li>
          ))}
        </ul>
      </label>
      <br />

      <button type="submit">Save</button>
    </form>
    </>
  );
};

export default Signup;

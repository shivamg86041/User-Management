import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      console.log(response.data);
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
      window.alert("Invalid Credentials.")
      // Handle error
    }
  };

  return (
    <>
    <p className='loginbtn'>
        New User?{' '}
        <Link to="/" className="login-link">
          <button className="login-button">Sign up</button>
        </Link>
      </p>
    <form onSubmit={handleLogin}>
      <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    </>
  );
};

export default Login;

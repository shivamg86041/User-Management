import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import EditUser from './Components/EditUser';
import ViewDetails from './Components/ViewDetails';
import AddUser from './Components/AddUser'
import './App.css';

const App = () => {
  return (
    // <Router>
    <div className="App">
    <header className="App-header">
          <h1>User Management App</h1>
        </header>
      <div  className="container">
        <Routes>
          <Route path="/" exact element={<Signup/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/edit/:userId" component={<EditUser/>} /> 
          <Route path="/add-user" element={<AddUser/>} />
          <Route path="/view-details/:userId" element={<ViewDetails/>} />
        </Routes>
      </div>
      </div>
    // </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditUser = ({ match, history }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { userId } = useParams();

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
        } else {
          console.error('Error fetching user details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, [match.params.userId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User updated successfully');
        
        navigate('/dashboard');
        window.alert("Updated Successfully")
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h2>Edit User</h2>
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
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  );
};

export default EditUser;

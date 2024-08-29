
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          alert('Please enable WI-FI or Mobile Data');
          return;
        }
        
          const response = await fetch('http://localhost:5000/api/users');

          if (response.ok) {
            const data = await response.json();
            setUsers(data);

            // Save the fetched data to local storage
            localStorage.setItem('users', JSON.stringify(data));
          } else {
            setShowNoData(true);
          }
      } catch (error) {
        console.error('Error fetching users:', error);
        setShowNoData(true);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    // Set the user ID to be edited
    setEditUserId(userId);

    // Fetch user details for editing
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setEditUserData({
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
  };

  const handleSort = (criteria) => {
    // Define sorting functions based on criteria
    const sortFunctions = {
      'A-Z': (a, b) => a.name.localeCompare(b.name),
      'Z-A': (a, b) => b.name.localeCompare(a.name),
      'Last Modified': (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      'Last Inserted': (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    };

    // Sort the users based on the selected criteria and sortOrder
    const sortedUsers = [...users].sort(sortFunctions[criteria]);
    setUsers(sortOrder === 'asc' ? sortedUsers : sortedUsers.reverse());
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUserData),
      });

      if (response.ok) {
        console.log('User updated successfully');
        // Clear the edit mode
        setEditUserId(null);
        // Fetch updated users and update the state
        const updatedUsersResponse = await fetch('http://localhost:5000/api/users');
        const updatedUsersData = await updatedUsersResponse.json();
        setUsers(updatedUsersData);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  const handleCancelEdit = () => {
    // Clear the edit mode
    setEditUserId(null);
    setEditUserData({
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
  

  return (
    <div>
      {showNoData && <img src="placeholder-image.jpg" alt="No Data Found" />}
      <div className='filter'>
        {/* Add sorting buttons */}
        <button onClick={() => handleSort('A-Z')}>Sort A-Z</button>
        <button onClick={() => handleSort('Z-A')}>Sort Z-A</button>
        <button onClick={() => handleSort('Last Modified')}>Sort Last Modified</button>
        <button onClick={() => handleSort('Last Inserted')}>Sort Last Inserted</button>
      </div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="card">
            {editUserId === user._id ? (
              // Show editable fields in edit mode
              <>
                <label>
                  Name:
                  <input type="text" name="name" value={editUserData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                  Email:
                  <input type="email" name="email" value={editUserData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                  Phone:
                  <input type="tel" name="phone" value={editUserData.phone} onChange={handleChange} />
                </label>
                <br />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              // Show user details in view mode
              <>
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <Link to={`/view-details/${user._id}`} >View Details</Link>
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}

      {/* Add User Button */}
      <Link to="/add-user" className="add-user-button">Add User</Link>
    </div>
  );
};

export default Dashboard;


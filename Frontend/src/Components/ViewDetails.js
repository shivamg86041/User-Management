import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`);

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Error fetching user details:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user details:', error.message);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Username: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
      <p>City: {userData.city}</p>
      <p>State: {userData.state}</p>
      <p>Gender: {userData.gender}</p>
      {/* Add other user details as needed */}
    </div>
  );
};

export default ViewDetails;

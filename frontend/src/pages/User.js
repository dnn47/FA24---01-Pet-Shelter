import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
  });

  // Placeholder for fetching user data
  useEffect(() => {
    // Example:
    // fetch('/api/user/profile')
    //   .then(res => res.json())
    //   .then(data => setUserData(data));
  }, []);

  const handleEditProfile = () => {
    navigate('/user/edit'); // Navigate to an edit profile form page
  };

  return (
    <div style={styles.container}>
      <h1>User Profile Page</h1>
      <div style={styles.profileContainer}>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phone}</p>
        <p><strong>Address:</strong> {userData.address}</p>
      </div>
      <button style={styles.editButton} onClick={handleEditProfile}>
        Edit User Profile
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1rem',
    textAlign: 'center',
  },
  profileContainer: {
    textAlign: 'left',
    margin: '1rem 0',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  editButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default User;

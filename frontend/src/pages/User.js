import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

// API call to fetch all users
const getAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:5001/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const rawData = await getAllUsers(); // Fetch raw data from the backend

        // Format the raw data into the structure needed for the DataGrid
        const formattedData = rawData.map((user, index) => ({
          id: user.user_id, // Use user_id as unique key for rows
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          age: user.age,
          address: user.address,
          phoneNumber: user.phone_number,
          gender: user.gender,
        }));

        setUsers(formattedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => console.log(`Viewing details for ${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      <h1>Users</h1>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
      />
      <Button
        variant="contained"
        style={{ marginTop: '1rem' }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </div>
  );
}

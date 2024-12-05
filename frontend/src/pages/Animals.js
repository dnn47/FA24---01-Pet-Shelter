import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { getAllAnimals } from '../api/animalsApi'; // Import API call

export default function Animals({ role }) {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  // Fetch data and format it
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const rawData = await getAllAnimals(); // Fetch raw data from the backend
        console.log(rawData)
        // Format the raw data into the structure needed for the DataGrid
        const formattedData = rawData.map((animal, index) => ({
          id: index, // Use index as unique key for rows
          name: animal.name,
          shelter: `Shelter ${animal.shelter_id}`,
          birthday: animal.birthdate,
          gender: animal.gender,
          special_needs: animal.special_needs,
          fixed: animal.is_fixed ? 'Yes' : 'No',
          vaccinated: animal.is_vaccinated ? 'Yes' : 'No',
          availability: animal.is_adopted ? 'Adopted' : 'Available',
          image: animal.img_url,
        }));
        console.log(formattedData)
        setAnimals(formattedData);
      } catch (error) {
        console.error('Failed to fetch animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'shelter', headerName: 'Shelter', width: 150 },
    { field: 'birthday', headerName: 'Birthday', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'special_needs', headerName: 'Special Needs', width: 150 },
    { field: 'fixed', headerName: 'Fixed', width: 100 },
    { field: 'vaccinated', headerName: 'Vaccinated', width: 150 },
    { field: 'availability', headerName: 'Availability', width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Animal"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: () => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/animalview')}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={animals}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
      {role === 'admin' && (
        <Button
          variant="contained"
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/add-animal-form')} // Navigate to add animal form
        >
          Add Animal
        </Button>
      )}
    </div>
  );
}

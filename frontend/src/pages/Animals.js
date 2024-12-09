import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getAllAnimals, getAnimalById, } from '../api/animalsApi'; // Import API call
import { submitApplication } from '../api/applicationsApi';
import { getFormByUser } from '../api/formApi';

export default function Animals({ role }) {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch data and format it
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const rawData = await getAllAnimals(); // Fetch raw data from the backend
        const formattedData = rawData.map((animal) => ({
          id: animal.animal_id, // Use animal_id as the unique key
          name: animal.name,
          shelter: `Shelter ${animal.shelter_id}`,
          birthday: animal.birthdate,
          gender: animal.gender,
          species: animal.species,
          special_needs: animal.special_needs ? 'Yes' : 'No',
          fixed: animal.is_fixed ? 'Yes' : 'No',
          vaccinated: animal.is_vaccinated ? 'Yes' : 'No',
          availability: animal.is_adopted ? 'Adopted' : 'Available',
          image: animal.img_url,
        }));
        setAnimals(formattedData);
      } catch (error) {
        console.error('Failed to fetch animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  const handleViewClick = async (animalId) => {
    try {
      const rawData = await getAnimalById(animalId); // Fetch animal by ID
      const formattedData = {
        id: rawData.animal_id, // Use animal_id as the unique key
        name: rawData.name,
        shelter: `Shelter ${rawData.shelter_id}`,
        birthday: rawData.birthdate,
        gender: rawData.gender,
        species: rawData.species,
        special_needs: rawData.special_needs ? 'Yes' : 'No',
        fixed: rawData.is_fixed ? 'Yes' : 'No',
        vaccinated: rawData.is_vaccinated ? 'Yes' : 'No',
        availability: rawData.is_adopted ? 'Adopted' : 'Available',
        image: rawData.img_url,
      };
      // Navigate to the animal view page and pass the animal details or ID
      navigate('/animalview', { state: { formattedData } });
    } catch (error) {
      console.error('Failed to fetch animal by ID:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'shelter', headerName: 'Shelter', width: 150 },
    { field: 'birthday', headerName: 'Birthday', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'species', headerName: 'Species', width: 100 },
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
      width: 250,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleViewClick({
              "user_id" : 1, 
              "animal_id" : params.row.id}
            )}
          >
            View
          </Button>
          {params.row.availability === 'Available' && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={async () => {
                try {
                  const form = await getFormByUser(1); 
                  const formId = form[0]["form_id"];
                  console.log("Form ID:", formId);
                  if (form === null) {
                    setOpenDialog(true);
                  } else {
                    submitApplication({
                      "user_id": 1,
                      "form_id": formId, 
                      "animal_id": params.row.id
                    });
                  }
                } catch (error) {
                  console.error("Error fetching form:", error);
                }
              }}
            >
              Apply for Adoption
            </Button>
          )}

          {/* Dialog Popup */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Complete Your Application</DialogTitle>
            <DialogContent>
              <p>You need to fill out a form in the Application tab before applying to adopt a pet.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => navigate('/application-tab')} color="primary">
                Go to Application Tab
              </Button>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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

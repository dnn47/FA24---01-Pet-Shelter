import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { getAllAnimals, getAnimalById, addAnimal, removeAnimal } from '../api/animalsApi';
import { getFormByUser} from '../api/formApi';
import { submitApplication } from '../api/applicationsApi';

export default function Animals({ role }) {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    shelter_id: 1,
    birthdate: '',
    species: '',
    gender: '',
    special_needs: false,
    is_fixed: false,
    is_vaccinated: false,
    img_url: '',
  });

  // Fetch data and format it
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const rawData = await getAllAnimals();
        const formattedData = rawData.map((animal) => ({
          id: animal.animal_id,
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
      const rawData = await getAnimalById(animalId);
      const formattedData = {
        id: rawData.animal_id,
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
      navigate('/animalview', { state: { formattedData } });
    } catch (error) {
      console.error('Failed to fetch animal by ID:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnimal = async () => {
    try {
      await addAnimal(newAnimal);
      const updatedAnimals = await getAllAnimals();
      setAnimals(
        updatedAnimals.map((animal) => ({
          id: animal.animal_id,
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
        }))
      );
      handleClose();
    } catch (error) {
      console.error('Failed to add animal:', error);
    }
  };

  const handleRemoveAnimal = async (animalId) => {
    try {
      await removeAnimal(animalId);
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== animalId));
    } catch (error) {
      console.error('Failed to remove animal:', error);
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
            onClick={() => handleViewClick(params.row.id)}
          >
            View
          </Button>
          {params.row.availability === 'Available' && role === 'user' && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={async () => {
                try {
                  const form = await getFormByUser(1);
                  const formId = form[0]?.form_id;
                  if (form === null) {
                    setOpenDialog(true);
                  } else {
                    submitApplication({
                      user_id: 1,
                      form_id: formId,
                      animal_id: params.row.id,
                    });
                  }
                } catch (error) {
                  console.error('Error fetching form:', error);
                }
              }}
            >
              Apply for Adoption
            </Button>
          )}
          {role === 'admin' && (
            <Button
              variant="contained"
              size="small"
              color="error"
              style={{ marginLeft: '10px' }}
              onClick={() => handleRemoveAnimal(params.row.id)}
            >
              Delete
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    overflow: 'auto',  // Make modal scrollable
    maxHeight: '80vh',  // Limit max height
  };

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
          onClick={handleOpen}
        >
          Add Animal
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Add New Animal</h2>
          <label>Name</label>
          <TextField
            name="name"
            fullWidth
            onChange={handleInputChange}
          />
          <label>Birthdate</label>
          <TextField
            name="birthdate"
            fullWidth
            onChange={handleInputChange}
          />
          <label>Species</label>
          <Select
            name="species"
            fullWidth
            value={newAnimal.species}
            onChange={handleInputChange}
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
          </Select>
          <label>Gender</label>
          <Select
            name="gender"
            fullWidth
            value={newAnimal.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <label>Is this animal vaccinated ?</label>
          <Select
            name="is_vaccinated"
            fullWidth
            value={newAnimal.is_vaccinated}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <label>Is this animal spayed or neutered ?</label>
          <Select
            name="is_fixed"
            fullWidth
            value={newAnimal.is_fixed}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <label>Does this animal require special needs?</label>
          <Select
            name="special_needs"
            fullWidth
            value={newAnimal.special_needs}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <label>Upload an image URL</label>
          <TextField
            name="img_url"
            fullWidth
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            style={{ marginTop: '1rem' }}
            onClick={handleAddAnimal}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

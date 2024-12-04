import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/Table';
import Button from '@mui/material/Button';

// Sample data to populate the table
function createData(application_id, animal_id, user_id, submit_date, review_date) {
  return { application_id, animal_id, user_id, submit_date, review_date };
}

const rows = [
  createData('A123', 'Fluffy', 'User1', '2024-11-20', '2024-11-21'),
  createData('A124', 'Sparky', 'User2', '2024-11-21', '2024-11-22'),
];

export default function Applications({ role }) {
  const navigate = useNavigate();

  if (role === 'user') {
    // User view: View their applications and submit new ones
    return (
      <>
        <h1>Applications</h1>
        <DataTable
          data={rows}
          actionType="View"
          actionLink="/applicationview" // Navigate to application details
        />
        <Button
          variant="contained"
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/application-form')} // Navigate to the form to submit a new application
        >
          Submit New Application
        </Button>
      </>
    );
  }

  if (role === 'admin') {
    // Admin view: Review applications
    return (
      <>
        <h1>Review Applications</h1>
        <DataTable
          data={rows}
          actionType="Review"
          actionLink="/review-application" // Navigate to review page
        />
      </>
    );
  }

  return null;
}

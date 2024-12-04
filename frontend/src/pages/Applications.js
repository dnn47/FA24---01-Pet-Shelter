import * as React from 'react';
import DataTable from '../components/Table';
import Button from '@mui/material/Button';

function createData(application_id, animal_id, user_id, submit_date, review_date) {
    return { application_id, animal_id, user_id, submit_date, review_date };
  }
  
  const rows = [
    createData('A123', 'Fluffy', 'User1', '2024-11-20', '2024-11-21'),
    createData('A124', 'Sparky', 'User2', '2024-11-21', '2024-11-22'),
    createData('A125', 'Bella', 'User3', '2024-11-22', '2024-11-23'),
    createData('A126', 'Max', 'User4', '2024-11-23', '2024-11-24'),
    createData('A127', 'Charlie', 'User5', '2024-11-24', '2024-11-25'),
  ];  

export default function Applications({role}) {
    switch (role) {
        case "user":
            return (
                <>
                <DataTable data={rows} actionType="View"/>
                <Button variant="contained" href="#contained-buttons">
                  Submit New Application
                </Button>
                </>
              );
        case "admin":
            return <DataTable data={rows} actionType="Review" />
        default:
          return null;
      }
  
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/Table'; // Adjust the path if needed
import Button from '@mui/material/Button';
import { getAllApplications, getApplicationsByUser } from '../api/applicationsApi'; // Import API call

export default function Applications({ role }) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  // Fetch data and format it
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let rawData;

        if (role === 'user') {
          rawData = await getApplicationsByUser(1); // Fetch user-specific applications (replace with actual user ID)
        } else if (role === 'admin') {
          rawData = await getAllApplications(); // Fetch all applications for admin
        }

        // Format the raw data into the structure needed for the table
        const formattedData = rawData.map((application, index) => {
          const status = application.review_date 
            ? application.status
            : application.submit_date 
            ? 'Pending' 
            : 'Not Submitted';

          return {
            id: index, // Use index as unique key for rows
            application_id: application.application_id,
            animal_id: application.animal_id,
            user_id: application.user_id,
            submit_date: application.submit_date, // Format date
            review_date: application.review_date ? application.review_date : '', // Format review date
            status: status, // Add status field
          };
        });

        setApplications(formattedData);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, [role]);

  // Define columns including the new status column
  const columns = [
    { field: 'application_id', headerName: 'Application ID', width: 150 },
    { field: 'animal_id', headerName: 'Animal ID', width: 150 },
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'submit_date', headerName: 'Submit Date', width: 150 },
    { field: 'review_date', headerName: 'Review Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 }, // Status column
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/applicationview/${params.row.application_id}`)} // Navigate to application details
        >
          View
        </Button>
      ),
    },
  ];

  if (role === 'user') {
    // User view: View their applications and submit new ones
    return (
      <>
        <h1>Applications</h1>
        <DataTable
          data={applications}
          columns={columns} // Pass columns including status
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
          data={applications}
          columns={columns} // Pass columns including status
          actionType="Review"
          actionLink="/review-application" // Navigate to review page
        />
      </>
    );
  }

  return null;
}

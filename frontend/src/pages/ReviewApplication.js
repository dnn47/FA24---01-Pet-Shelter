import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { reviewApplication } from '../api/applicationsApi'; // Import API call

function ReviewApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = JSON.parse(new URLSearchParams(location.search).get('data')) || {};

  const handleApprove = () => {
    console.log(`Approved Application: ${data.application_id}`);
    reviewApplication(data.application_id, "Approved");
    navigate('/applications'); // Redirect to applications after action
  };

  const handleDeny = () => {
    console.log(`Denied Application: ${data.application_id}`);
    reviewApplication(data.application_id, "Rejected");
    navigate('/applications'); // Redirect to applications after action
  };

  if (!Object.keys(data).length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="textSecondary">
          No application data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" padding={3}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Application Review
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(data).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="body1" color="textSecondary">
                  <strong>{formatKey(key)}:</strong> {value || 'N/A'}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Box display="flex" justifyContent="space-around" padding={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            sx={{ padding: '0.5rem 2rem' }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeny}
            sx={{ padding: '0.5rem 2rem' }}
          >
            Deny
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

// Helper function to format keys into a user-friendly format
function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default ReviewApplication;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

function AnimalView() {
  const location = useLocation();
  const animal = location.state?.formattedData || {}; // Access the passed state

  if (!Object.keys(animal).length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="textSecondary">
          No animal data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" padding={3}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3 }}>
        <CardMedia
          component="img"
          alt={animal.name}
          height="300"
          image={animal.image}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {animal.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Shelter:</strong> {animal.shelter}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Birthday:</strong> {animal.birthday}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Gender:</strong> {animal.gender}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Special Needs:</strong> {animal.special_needs}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Fixed:</strong> {animal.fixed}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Vaccinated:</strong> {animal.vaccinated}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Availability:</strong> {animal.availability}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AnimalView;

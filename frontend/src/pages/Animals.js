import * as React from 'react';
import DataTable from '../components/Table';

function createData(name, shelter, birthday, gender, special_needs, fixed, vaccinated, availability, image) {
  return { name, shelter, birthday, gender, special_needs, fixed, vaccinated, availability, image };
}

const rows = [
  createData('Fluffy', 'Shelter A', '01/01/2020', 'Female', 'None', 'Yes', 'Yes', 'Available', 'https://via.placeholder.com/50'),
  createData('Sparky', 'Shelter B', '02/14/2019', 'Male', 'None', 'No', 'Yes', 'Adopted', 'https://via.placeholder.com/50'),
  createData('Bella', 'Shelter A', '12/05/2018', 'Female', 'Allergy', 'Yes', 'No', 'Available', 'https://via.placeholder.com/50'),
  createData('Max', 'Shelter C', '03/22/2017', 'Male', 'None', 'Yes', 'Yes', 'Adopted', 'https://via.placeholder.com/50'),
  createData('Charlie', 'Shelter B', '06/15/2021', 'Male', 'None', 'No', 'Yes', 'Available', 'https://via.placeholder.com/50'),
];

export default function Animals() {
  return <DataTable data={rows} actionType="Apply"/>
}

import { useLocation } from 'react-router-dom';

function AnimalView() {
  const location = useLocation();
  const animal  = location.state.formattedData || {}; // Access the passed state
  if (!animal) {
    return <div>No animal data available.</div>;
  }

  return (
    <div>
      <h1>{animal.name}</h1>
      <img src={animal.image} alt={animal.name} style={{ width: '200px' }} />
      <p>Shelter: {animal.shelter}</p>
      <p>Birthday: {animal.birthday}</p>
      <p>Gender: {animal.gender}</p>
      <p>Special Needs: {animal.special_needs}</p>
      <p>Fixed: {animal.fixed}</p>
      <p>Vaccinated: {animal.vaccinated}</p>
      <p>Availability: {animal.availability}</p>
    </div>
  );
}

export default AnimalView;

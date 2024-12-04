import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAnimalForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    shelter_id: '',
    birthdate: '',
    gender: '',
    special_needs: false,
    is_fixed: false,
    is_vaccinated: false,
    is_adopted: false,
    img_url: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Animal:', formData);

    // Placeholder for backend API integration
    try {
      const response = await fetch('https://api.example.com/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add animal');
      }

      const result = await response.json();
      console.log('Animal added:', result);

      // Navigate back to Animals page or reset the form
      navigate('/animals');
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Add Animal</h1>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Shelter ID:
        <input
          type="number"
          name="shelter_id"
          value={formData.shelter_id}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Birthdate:
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Special Needs:
        <input
          type="checkbox"
          name="special_needs"
          checked={formData.special_needs}
          onChange={handleChange}
        />
      </label>
      <label>
        Fixed:
        <input
          type="checkbox"
          name="is_fixed"
          checked={formData.is_fixed}
          onChange={handleChange}
        />
      </label>
      <label>
        Vaccinated:
        <input
          type="checkbox"
          name="is_vaccinated"
          checked={formData.is_vaccinated}
          onChange={handleChange}
        />
      </label>
      <label>
        Adopted:
        <input
          type="checkbox"
          name="is_adopted"
          checked={formData.is_adopted}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" style={styles.submitButton}>
        Add Animal
      </button>
      <button
        type="button"
        style={styles.backButton}
        onClick={() => navigate('/animals')}
      >
        Cancel
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '0.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '0.5rem',
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddAnimalForm;

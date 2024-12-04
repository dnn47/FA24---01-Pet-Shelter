import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicationId: '',
    creditScore: '',
    householdNum: '',
    netIncome: '',
    homeType: '',
    preexistingPets: false,
    landlordContact: '',
    isAllergic: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Application:', formData);

    // Placeholder for backend integration
    try {
      const response = await fetch('https://api.example.com/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      console.log('Application submitted:', result);

      // Clear the form
      setFormData({
        applicationId: '',
        creditScore: '',
        householdNum: '',
        netIncome: '',
        homeType: '',
        preexistingPets: false,
        landlordContact: '',
        isAllergic: false,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Submit Application</h1>
      <label>
        Application ID:
        <input
          type="text"
          name="applicationId"
          value={formData.applicationId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Credit Score:
        <input
          type="number"
          name="creditScore"
          value={formData.creditScore}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Household Members:
        <input
          type="number"
          name="householdNum"
          value={formData.householdNum}
          onChange={handleChange}
        />
      </label>
      <label>
        Net Income:
        <input
          type="number"
          name="netIncome"
          value={formData.netIncome}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Home Type:
        <input
          type="text"
          name="homeType"
          value={formData.homeType}
          onChange={handleChange}
        />
      </label>
      <label>
        Preexisting Pets:
        <input
          type="checkbox"
          name="preexistingPets"
          checked={formData.preexistingPets}
          onChange={handleChange}
        />
      </label>
      <label>
        Landlord Contact:
        <input
          type="text"
          name="landlordContact"
          value={formData.landlordContact}
          onChange={handleChange}
        />
      </label>
      <label>
        Allergic:
        <input
          type="checkbox"
          name="isAllergic"
          checked={formData.isAllergic}
          onChange={handleChange}
        />
      </label>
      <button type="submit" style={styles.submitButton}>Submit</button>
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
};

export default ApplicationForm;

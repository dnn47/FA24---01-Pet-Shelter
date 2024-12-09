import React, { useState } from 'react';
import { submitForm } from '../api/formApi';

const Form = () => {
  const [formData, setFormData] = useState({
    user_id: 1,
    credit_score: '',
    household_num: '',
    net_income: '',
    home_type: '',
    preexisting_pets: false,
    landlord_contact: '',
    is_allergic: false,
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
    console.log('Submitting Form:', formData);

    try {
      const response = await submitForm(formData);

      // Reset the form data after submission
      setFormData({
        user_id: 1,
        credit_score: '',
        household_num: '',
        net_income: '',
        home_type: '',
        preexisting_pets: false,
        landlord_contact: '',
        is_allergic: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Submit Form</h1>
      <label>
        Credit Score:
        <input
          type="number"
          name="credit_score"
          value={formData.credit_score}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Household Members:
        <input
          type="number"
          name="household_num"
          value={formData.household_num}
          onChange={handleChange}
        />
      </label>
      <label>
        Net Income:
        <input
          type="number"
          name="net_income"
          value={formData.net_income}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Home Type:
        <input
          type="text"
          name="home_type"
          value={formData.home_type}
          onChange={handleChange}
        />
      </label>
      <label>
        Preexisting Pets:
        <input
          type="checkbox"
          name="preexisting_pets"
          checked={formData.preexisting_pets}
          onChange={handleChange}
        />
      </label>
      <label>
        Landlord Contact:
        <input
          type="text"
          name="landlord_contact"
          value={formData.landlord_contact}
          onChange={handleChange}
        />
      </label>
      <label>
        Allergic:
        <input
          type="checkbox"
          name="is_allergic"
          checked={formData.is_allergic}
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

export default Form;

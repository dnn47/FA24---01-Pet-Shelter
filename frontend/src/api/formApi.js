import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/form'; // Adjusted to your Flask backend URL


// Submit a new form (USER)
export const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/newForm`, formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

// Get form by user ID (ADMIN/USER)
export const getFormByUser = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching form by user:', error);
      throw error;
    }
  };
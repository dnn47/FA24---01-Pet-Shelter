import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/applications'; // Adjusted to your Flask backend URL

// Get all adoption applications (ADMIN)
export const getAllApplications = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

// Submit a new application (USER)
export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(API_BASE_URL, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Get applications by user ID (ADMIN/USER)
export const getApplicationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications by user:', error);
    throw error;
  }
};

// Review an application (ADMIN)
export const reviewApplication = async (applicationId, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${applicationId}/review`, { status });
    return response.data;
  } catch (error) {
    console.error('Error reviewing application:', error);
    throw error;
  }
};

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // Replace with your Flask server's URL

export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

export const getAvailableAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals/available`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available animals:', error);
    throw error;
  }
};

export const getAnimalById = async (animalId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/animals/${animalId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// Add more functions for other endpoints as needed

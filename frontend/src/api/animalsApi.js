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

// Add a new animal
export const addAnimal = async (animalData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/animals`, animalData);
    return response.data;
  } catch (error) {
    console.error('Error adding animal:', error);
    throw error;
  }
};

// Remove an animal
export const removeAnimal = async (animalId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/animals/${animalId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing animal:', error);
    throw error;
  }
};

// Add more functions for other endpoints as needed

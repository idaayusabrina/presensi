import axios from 'axios';

const API_BASE_URL = 'https://ayukkemana.pythonanywhere.com'; // Example API

// Function to get data from API
export const fetchData = async (path) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

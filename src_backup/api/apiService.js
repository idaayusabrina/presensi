import axios from 'axios';

const API_BASE_URL = ' http://127.0.0.1:8000/api'; // Example API

// Function to get data from API
export const fetchData = async (path, params = {}, type = "get") => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Optional: JWT or other token
    },
  }
  try {
    if (type == 'post') {
      const response = await axios.post(`${API_BASE_URL}/${path}/`, params);
      console.log(response.data)
      return response.data;
    }
    else if (type == 'patch') {
      const response = await axios.patch(`${API_BASE_URL}/${path}/`, params);
      console.log(response.data)
      return response.data;
    }
    else {
      const response = await axios.get(`${API_BASE_URL}/${path}/`, {
        params: params,
      });
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// src/services/contentfulService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; 

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    return response.data; // Assumes backend sends: res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

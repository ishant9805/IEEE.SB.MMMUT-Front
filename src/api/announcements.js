import axios from 'axios';

// Base URL for announcements API
const API_URL = 'https://ieee-back.vercel.app/api/announcements';

// Axios instance with global config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all announcements
export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a new announcement
export const createAnnouncement = async (announcementData) => {
  try {
    // Retrieve token from localStorage or cookies
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage after login
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('Sending request with headers:', config.headers); // Debug

    const response = await axiosInstance.post('/', announcementData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update an announcement
export const updateAnnouncement = async (id, announcementData) => {
  try {
    // Retrieve token from localStorage or cookies
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage after login
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.put(`/${id}`, announcementData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating announcement:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
  try {
    // Retrieve token from localStorage or cookies
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage after login
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.delete(`/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting announcement:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a single announcement by ID
export const getAnnouncementById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching announcement by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

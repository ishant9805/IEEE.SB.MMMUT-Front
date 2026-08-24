import axios from 'axios';
import { API_URL as API_BASE_PATH } from './config';

// ✅ Base URL for announcements API
const API_URL = `${API_BASE_PATH}/announcements`;

// ✅ Axios instance with global config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Get all announcements
export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ✅ Create a new announcement
export const createAnnouncement = async (announcementData, token) => {
  try {
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

// ✅ Update an announcement
export const updateAnnouncement = async (id, announcementData, token) => {
  try {
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

// ✅ Delete an announcement
export const deleteAnnouncement = async (id, token) => {
  try {
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

// ✅ Get a single announcement by ID
export const getAnnouncementById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching announcement by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

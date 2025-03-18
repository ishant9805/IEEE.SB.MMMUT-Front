import axios from 'axios';

const API_URL = 'http://localhost:5000/api/announcements';

// ✅ Axios instance with global config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// ✅ Get all announcements
export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

// ✅ Create a new announcement
export const createAnnouncement = async (announcementData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in headers
      },
    };

    const response = await axiosInstance.post('/', announcementData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

// ✅ Update an announcement
export const updateAnnouncement = async (id, announcementData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.put(`/${id}`, announcementData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

// ✅ Delete an announcement
export const deleteAnnouncement = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.delete(`/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};

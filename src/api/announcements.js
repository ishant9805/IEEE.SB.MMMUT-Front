import axios from 'axios';

const API_URL = 'https://ieee-back.vercel.app/api';

// ✅ Axios instance with global config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // ❌ Remove this if not using cookies for authentication
});

// ✅ Get all announcements
export const getAnnouncements = async () => {
  try {
    const response = await axiosInstance.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching announcements:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create a new announcement
export const createAnnouncement = async (announcementData, token) => {
  try {
    if (!token) throw new Error("Unauthorized: Token is missing"); // Debugging
    console.log("🔑 Token being sent:", token); // Debugging

    const response = await axiosInstance.post('/announcements', announcementData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Announcement Created:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('❌ Error creating announcement:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update an announcement
export const updateAnnouncement = async (id, announcementData, token) => {
  try {
    if (!token) throw new Error("Unauthorized: Token is missing");

    const response = await axiosInstance.put(`/announcements/${id}`, announcementData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Announcement Updated:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('❌ Error updating announcement:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete an announcement
export const deleteAnnouncement = async (id, token) => {
  try {
    if (!token) throw new Error("Unauthorized: Token is missing");

    const response = await axiosInstance.delete(`/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Announcement Deleted:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting announcement:', error.response?.data || error.message);
    throw error;
  }
};

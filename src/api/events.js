  import axios from 'axios';

  // ✅ Base URL for events API
  // const API_URL = 'https://ieee-back.vercel.app/api/events';
  const API_URL = 'https://ieee-back.vercel.app/api';

  // ✅ Axios instance with global config
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ✅ Get all events
  export const getEvents = async () => {
    try {
      const response = await axiosInstance.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // ✅ Create a new event
  export const createEvent = async (eventData, token) => {
    try {
      if (!token) {
        throw new Error('Authentication token is required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Remove 'Content-Type' header
        },
      };

      const response = await axios.post(`${API_URL}/events`, eventData, config);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // ✅ Update an event
  export const updateEvent = async (id, eventData, token) => {
    try {
      if (!token) {
        throw new Error('Authentication token is required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.put(`/events/${id}`, eventData, config);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // ✅ Delete an event
  export const deleteEvent = async (id, token) => {
    try {
      if (!token) {
        throw new Error('Authentication token is required');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.delete(`/events/${id}`, config);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // ✅ Get a single event by ID
  export const getEventById = async (id) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event by ID:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // ✅ Upload event poster to Cloudinary
  export const uploadEventPoster = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Event_poster'); // Replace with your Cloudinary upload preset

      const response = await fetch('https://api.cloudinary.com/v1_1/dxvyvt3bm/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Cloudinary Error: ${errorData.error.message}`);
      }

      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading event poster:', error);
      throw error;
    }
  };

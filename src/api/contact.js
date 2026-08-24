import axios from 'axios';
import { API_URL as API_BASE_PATH } from './config';

const API_URL = `${API_BASE_PATH}/contact`;

// Get all contact submissions
export const getContactSubmissions = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/submissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

// Delete a contact submission
export const deleteContactSubmission = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/submissions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};

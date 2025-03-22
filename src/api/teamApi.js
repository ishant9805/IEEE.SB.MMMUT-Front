import axios from 'axios';

const API_URL = 'https://ieee-back.vercel.app/api';

// Create a new team member (FIXED VERSION)
export const createTeamMember = async (memberData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Removed explicit Content-Type header
      }
    };

    // Axios will automatically set multipart/form-data
    const response = await axios.post(`${API_URL}/team`, memberData, config);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Full error details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

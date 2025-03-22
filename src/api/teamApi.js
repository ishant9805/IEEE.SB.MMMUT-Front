import axios from 'axios';

const API_URL = 'https://ieee-back.vercel.app/api';

// Create a new team member (FIXED VERSION)
export const createTeamMember = async (memberData, token) => {
    try {
        const response = await axios.post(`${API_URL}/team`, memberData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 
                           error.message || 'Request failed';
        console.error('API Error:', {
            status: error.response?.status,
            message: errorMessage,
            data: error.response?.data
        });
        throw new Error(errorMessage);
    }
};

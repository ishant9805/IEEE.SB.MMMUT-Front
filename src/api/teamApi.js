import axios from 'axios';

const API_URL = 'https://ieee-back.vercel.app/api';

export const getTeamMembers = async () => {
    try {
        const response = await axios.get(`${API_URL}/team`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team data:', error);
        throw error;
    }
};

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

export const updateTeamMember = async (id, memberData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await axios.put(`${API_URL}/team/${id}`, memberData, config);
        return response.data;
    } catch (error) {
        console.error('Error updating team member:', error);
        throw error;
    }
};

// Delete a team member
export const deleteTeamMember = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.delete(`${API_URL}/team/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error deleting team member:', error);
        throw error;
    }
};

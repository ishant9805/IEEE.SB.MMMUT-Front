import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Fetch all team members
export const getTeamMembers = async () => {
    try {
        const response = await axios.get(`${API_URL}/team/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team data:', error);
        throw error;
    }
};

// Create a new team member
export const createTeamMember = async (memberData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.post(`${API_URL}/team`, memberData, config);
        return response.data;
    } catch (error) {
        console.error('Error creating team member:', error.response.data);
        throw error;
    }
};

// Update a team member
export const updateTeamMember = async (id, memberData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
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

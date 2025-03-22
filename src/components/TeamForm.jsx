// import React, { useState } from 'react';
// import { createTeamMember, updateTeamMember } from '../api/teamApi';

// const TeamForm = ({ selectedMember, onSuccess }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         designation: '',
//         post: '',
//         email: '',
//         linkedin: '',
//         ieeeProfile: '',
//         committeeType: 'executive',
//         image: null,
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     useState(() => {
//         if (selectedMember) {
//             setFormData(selectedMember);
//         }
//     }, [selectedMember]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();

//         // Append all fields
//         Object.keys(formData).forEach((key) => {
//             if (formData[key]) formDataToSend.append(key, formData[key]);
//         });

//         try {
//             const token = localStorage.getItem('token');
//             if (selectedMember) {
//                 await updateTeamMember(selectedMember._id, formDataToSend, token);
//             } else {
//                 await createTeamMember(formDataToSend, token);
//             }
//             onSuccess();
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             setError('Failed to submit form');
//         }
//     };

import React, { useState, useEffect } from 'react';
import { createTeamMember, updateTeamMember } from '../api/teamApi';

const TeamForm = ({ selectedMember, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        post: '',
        email: '',
        linkedin: '',
        ieeeProfile: '',
        committeeType: 'executive',
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (selectedMember) {
            setFormData({
                ...selectedMember,
                image: null // Reset image when editing
            });
        }
    }, [selectedMember]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const formDataToSend = new FormData();
        
        // Append all fields explicitly
        formDataToSend.append('name', formData.name);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('post', formData.post);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('linkedin', formData.linkedin);
        formDataToSend.append('ieeeProfile', formData.ieeeProfile);
        formDataToSend.append('committeeType', formData.committeeType);
        
        if (formData.image instanceof File) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication required');

            if (selectedMember) {
                await updateTeamMember(selectedMember._id, formDataToSend, token);
                setSuccess('Member updated successfully!');
            } else {
                await createTeamMember(formDataToSend, token);
                setSuccess('Member added successfully!');
            }

            setFormData({
                name: '',
                designation: '',
                post: '',
                email: '',
                linkedin: '',
                ieeeProfile: '',
                committeeType: 'executive',
                image: null,
            });

            if (onSuccess) onSuccess();
            
        } catch (error) {
            setError(error.message || 'Failed to save member');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-ieee-blue mb-4">
                {selectedMember ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            {success && <div className="mb-4 text-green-500 text-sm">{success}</div>}
           
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Post"
                    value={formData.post}
                    onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="url"
                    placeholder="IEEE Profile"
                    value={formData.ieeeProfile}
                    onChange={(e) => setFormData({ ...formData, ieeeProfile: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    value={formData.committeeType}
                    onChange={(e) => setFormData({ ...formData, committeeType: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="chairperson">Chairperson</option>
                    <option value="executive">Executive Committee</option>
                    <option value="operating">Operating Committee</option>
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="w-full p-2 border rounded"
                />
                 <button
                    type="submit"
                    className="bg-ieee-blue text-white px-4 py-2 rounded hover:bg-ieee-blue/90 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : (selectedMember ? 'Update' : 'Add')}
                </button>
            </div>
        </form>
    );
};

export default TeamForm;

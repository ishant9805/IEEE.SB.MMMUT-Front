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
        committeeType: 'sophomore', // Default to 'sophomore'
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (selectedMember) {
            setFormData({
                ...selectedMember,
                image: null // Reset image to null when editing
            });
        }
    }, [selectedMember]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Event_poster"); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", "dxvyvt3bm"); // Replace with your Cloudinary cloud name

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dxvyvt3bm/image/upload", // Replace with your Cloudinary cloud name
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        return data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            let imageUrl = formData.image;

            // If a new image is uploaded, upload it to Cloudinary
            if (formData.image instanceof File) {
                imageUrl = await handleImageUpload(formData.image);
            }

            const memberData = {
                ...formData,
                image: imageUrl,
            };

            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication required');

            if (selectedMember) {
                await updateTeamMember(selectedMember._id, memberData, token);
                setSuccess('Member updated successfully!');
            } else {
                await createTeamMember(memberData, token);
                setSuccess('Member added successfully!');
            }

            // Reset form after success
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

            // Refresh parent component
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error('Submission error:', error);
            setError(error.response?.data?.message || 'Failed to save member');
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
                    <option value="junior">Junior Year Member</option>
                    <option value="sophomore">Sophomore Year Member</option>
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

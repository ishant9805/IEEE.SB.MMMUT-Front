import React, { useState, useEffect } from 'react';
import { getTeamMembers, deleteTeamMember } from '../api/teamApi';
import TeamForm from '../components/TeamForm';

const AdminTeam = () => {
    const [teamData, setTeamData] = useState({
        chairperson: {},
        executiveCommittee: [],
        operatingCommittees: [],
        juniorMembers: [],
        sophomoreMembers: [],
    });
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch team data
    const fetchTeamData = async () => {
        try {
            const data = await getTeamMembers();
            console.log('Fetched Team Data:', data); // Debugging log
            setTeamData(data);
            setError('');
        } catch (error) {
            console.error('Error fetching team data:', error);
            setError('Failed to fetch team data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTeamData();
    }, []);

    // Handle member deletion
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await deleteTeamMember(id, token);
            fetchTeamData(); // Refresh list after deletion
        } catch (error) {
            console.error('Error deleting team member:', error);
            setError('Failed to delete team member. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-ieee-blue mb-6">Manage Team</h2>

            {/* Team Form */}
            <TeamForm
                selectedMember={selectedMember}
                onSuccess={() => {
                    setSelectedMember(null);
                    fetchTeamData(); // Refresh list after submission
                }}
            />

            {/* Team Members List */}
            <div className="mt-8">
                {/* Chairperson */}
                {teamData.chairperson?._id && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-ieee-blue">{teamData.chairperson.name}</h3>
                        <p className="text-gray-600">{teamData.chairperson.designation}</p>
                        <p className="text-gray-500">{teamData.chairperson.post}</p>
                        {teamData.chairperson.image && (
                            <img
                                src={teamData.chairperson.image}
                                alt={teamData.chairperson.name}
                                className="w-24 h-24 object-cover rounded-full mt-2"
                            />
                        )}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => setSelectedMember(teamData.chairperson)}
                                className="text-ieee-blue hover:text-ieee-red"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(teamData.chairperson._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

                {/* Executive Committee */}
                {teamData.executiveCommittee?.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
                        <p className="text-gray-600">{member.designation}</p>
                        <p className="text-gray-500">{member.post}</p>
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 object-cover rounded-full mt-2"
                            />
                        )}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="text-ieee-blue hover:text-ieee-red"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Operating Committees */}
                {teamData.operatingCommittees?.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
                        <p className="text-gray-600">{member.designation}</p>
                        <p className="text-gray-500">{member.post}</p>
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 object-cover rounded-full mt-2"
                            />
                        )}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="text-ieee-blue hover:text-ieee-red"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {/* Junior Year Committees */}
                {teamData.juniorMembers?.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
                        <p className="text-gray-600">{member.designation}</p>
                        <p className="text-gray-500">{member.post}</p>
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 object-cover rounded-full mt-2"
                            />
                        )}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="text-ieee-blue hover:text-ieee-red"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {/* Sophomore Committees */}
                {teamData.sophomoreMembers?.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
                        <p className="text-gray-600">{member.designation}</p>
                        <p className="text-gray-500">{member.post}</p>
                        {member.image && (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 object-cover rounded-full mt-2"
                            />
                        )}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="text-ieee-blue hover:text-ieee-red"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeam;

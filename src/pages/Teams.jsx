import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaUser } from 'react-icons/fa';
import SophomoreGallery from '../components/SophomoreGallery';

const Teams = () => {
    const [teamData, setTeamData] = useState({
        chairperson: null,
        executiveCommittee: [],
        operatingCommittees: [],
        juniorMembers: [],
        sophomoreMembers: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/team'); // Add full backend URL
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setTeamData(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setError('Failed to load team data');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    const { chairperson, executiveCommittee, operatingCommittees, juniorMembers, sophomoreMembers } = teamData;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-ieee-blue text-center mb-8 mt-[100px]">Our Team</h1>

            {/* Chairperson Section */}
            {chairperson && (
                <section className="mb-12">
                    <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 mb-8 border border-white/30 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-72 lg:w-80 h-72 lg:h-80 overflow-hidden">
                                <img
                                    src={chairperson.image}
                                    alt={chairperson.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                            <div className="p-6 lg:p-8 flex-1">
                                <h2 className="text-3xl lg:text-4xl font-bold text-ieee-blue mb-2">
                                    {chairperson.name}
                                </h2>
                                <p className="text-xl lg:text-2xl text-ieee-red font-semibold mb-1">
                                    {chairperson.designation}
                                </p>
                                <p className="text-lg text-gray-600 mb-4">{chairperson.post}</p>
                                <div className="mt-6 flex space-x-6">
                                    <a href={`mailto:${chairperson.email}`} className="text-gray-600 hover:text-ieee-red transition-colors duration-300">
                                        <FaEnvelope className="w-8 h-8" />
                                    </a>
                                    <a href={chairperson.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ieee-red transition-colors duration-300">
                                        <FaLinkedin className="w-8 h-8" />
                                    </a>
                                    <a href={chairperson.ieeeProfile} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ieee-red transition-colors duration-300">
                                        <FaUser className="w-8 h-8" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Executive Committee */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-ieee-blue text-center mb-8">Executive Committee</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {executiveCommittee.map((member, index) => (
                        <MemberCard key={member._id} member={member} />
                    ))}
                </div>
            </section>

            {/* Operating Committees */}
            <section>
                <h2 className="text-3xl font-bold text-ieee-blue text-center mb-8">Operating Committees</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {operatingCommittees.map((member, index) => (
                        <MemberCard key={member._id} member={member} />
                    ))}
                </div>
            </section>

            {juniorMembers && juniorMembers.length > 0 && (<section>
                <h2 className="text-3xl font-bold text-ieee-blue text-center mb-2">Junior Year Members</h2>
                <div>
                    {/* {juniorMembers.map((member, index) => (
                        <MemberCard key={member._id} member={member} />
                    ))} */}
                    <SophomoreGallery members={juniorMembers} />
                </div>
            </section>)}

            {sophomoreMembers && sophomoreMembers.length > 0 && (<section>
                <h2 className="text-3xl font-bold text-ieee-blue text-center mb-2">Sophomore Year Members</h2>
                <div>
                    <SophomoreGallery members={sophomoreMembers} />
                </div>
            </section>)}
        </div>
    );
};

const MemberCard = ({ member }) => (
    <div className="bg-white/80 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
            src={member.image}
            alt={member.name}
            className="w-full h-64 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
            <p className="text-ieee-red">{member.designation}</p>
            <p className="text-gray-500">{member.post}</p>
            <div className="mt-4 flex space-x-4">
                <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-ieee-red transition-colors">
                    <FaEnvelope className="w-6 h-6" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-ieee-red transition-colors">
                    <FaLinkedin className="w-6 h-6" />
                </a>
                <a href={member.ieeeProfile} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-ieee-red transition-colors">
                    <FaUser className="w-6 h-6" />
                </a>
            </div>
        </div>
    </div>
);

export default Teams;

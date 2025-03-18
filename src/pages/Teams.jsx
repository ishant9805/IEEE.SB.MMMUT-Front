import React from 'react';
import { FaEnvelope, FaLinkedin, FaUser } from 'react-icons/fa'; // Icons for email, LinkedIn, and IEEE profile

const Teams = () => {
    // Dummy data for Chairperson and members
    const chairperson = {
        image: 'UjjwalCp.jpg',
        name: 'Ujjwal Kumar',
        designation: 'EE 3rd Year',
        post: 'Chairperson',
        email: 'Ujjwal@ieee.org',
        linkedin: 'www.linkedin.com/in/ujjwal-kumar-3446a325b',
        ieeeProfile: 'https://ieee-collabratec.ieee.org/app/p/UjjwalKumar1118955/about',
    };

    const members = [
        {
            image: 'https://via.placeholder.com/150x150?text=Member+1',
            name: 'Jane Smith',
            designation: 'Vice Chairperson',
            post: 'IEEE Student Branch',
            email: 'jane@ieee.org',
            linkedin: 'https://linkedin.com/in/janesmith',
            ieeeProfile: 'https://ieee.org/janesmith',
        },
        {
            image: 'https://via.placeholder.com/150x150?text=Member+2',
            name: 'Alice Johnson',
            designation: 'Secretary',
            post: 'IEEE Student Branch',
            email: 'alice@ieee.org',
            linkedin: 'https://linkedin.com/in/alicejohnson',
            ieeeProfile: 'https://ieee.org/alicejohnson',
        },
        {
            image: 'https://via.placeholder.com/150x150?text=Member+2',
            name: 'Alice Johnson',
            designation: 'Secretary',
            post: 'IEEE Student Branch',
            email: 'alice@ieee.org',
            linkedin: 'https://linkedin.com/in/alicejohnson',
            ieeeProfile: 'https://ieee.org/alicejohnson',
        },
        {
            image: 'https://via.placeholder.com/150x150?text=Member+3',
            name: 'Bob Brown',
            designation: 'Treasurer',
            post: 'IEEE Student Branch',
            email: 'bob@ieee.org',
            linkedin: 'https://linkedin.com/in/bobbrown',
            ieeeProfile: 'https://ieee.org/bobbrown',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6 bg-transparent">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-ieee-blue text-center mb-8 z-1000 mt-[100px]">Our Team</h1>

            {/* Chairperson Card */}
            <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 mb-8 border border-white/30 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-72 lg:w-80 h-72 lg:h-80 overflow-hidden">
                        <img
                            src={chairperson.image}
                            alt={chairperson.name}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 lg:p-8 flex-1">
                        {/* Name and Designation */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-ieee-blue mb-2">
                            {chairperson.name}
                        </h2>
                        <p className="text-xl lg:text-2xl text-ieee-red font-semibold mb-1">
                            {chairperson.designation}
                        </p>
                        <p className="text-lg text-gray-600 mb-4">{chairperson.post}</p>

                        {/* Social Links */}
                        <div className="mt-6 flex space-x-6">
                            <a
                                href={`mailto:${chairperson.email}`}
                                className="text-gray-600 hover:text-ieee-red transition-colors duration-300"
                                aria-label="Email"
                            >
                                <FaEnvelope className="w-8 h-8" />
                            </a>
                            <a
                                href={chairperson.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-ieee-red transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-8 h-8" />
                            </a>
                            <a
                                href={chairperson.ieeeProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-ieee-red transition-colors duration-300"
                                aria-label="IEEE Profile"
                            >
                                <FaUser className="w-8 h-8" />
                            </a>
                        </div>

                        {/* Optional: Quote or Description */}
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <p className="text-gray-700 italic">
                                "Leadership is not about being in charge. It's about taking care of those in your charge."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Member Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white/50"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-ieee-blue">{member.name}</h3>
                            <p className="text-gray-600">{member.designation}</p>
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
                ))}
            </div>
        </div>
    );
};

export default Teams;
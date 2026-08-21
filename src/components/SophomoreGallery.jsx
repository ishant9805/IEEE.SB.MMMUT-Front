import React, { useEffect, useMemo, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaUser, FaTimes } from 'react-icons/fa';
import CircularGallery from './CircularGallery/CircularGallery';
import ProfileCard from './ProfileCard/ProfileCard';

// Displays sophomore members as a browsable circular gallery. Clicking a
// member opens a ProfileCard with their details; the card's contact button
// opens a small menu linking out to email, LinkedIn, and their IEEE profile.
const SophomoreGallery = ({ members = [] }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [showLinksMenu, setShowLinksMenu] = useState(false);

    const items = useMemo(
        () => members.map(member => ({ image: member.image, text: member.name, id: member._id })),
        [members]
    );

    const handleItemClick = (_item) => {
        setShowLinksMenu(false);
        const member = members.find(m => m._id === _item.id);
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
        setShowLinksMenu(false);
    };

    useEffect(() => {
        if (!selectedMember) return;
        const onKeyDown = e => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedMember]);

    if (!members.length) return null;

    return (
        <div className="relative">
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery
                    items={items}
                    bend={3}
                    textColor="#00629B"
                    borderRadius={0.05}
                    scrollEase={0.02}
                    onItemClick={handleItemClick}
                />
            </div>
            <p className="text-center text-sm text-gray-500 -mt-2">
                Scroll or drag to browse &middot; click a member to see their details
            </p>

            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedMember.name} details`}
                >
                    <div
                        className="relative"
                        onClick={e => e.stopPropagation()}
                        style={{ width: 'min(90vw, 380px)' }}
                    >
                        <button
                            type="button"
                            onClick={closeModal}
                            aria-label="Close"
                            className="absolute -top-3 -right-3 z-20 bg-white text-ieee-blue rounded-full w-9 h-9 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaTimes />
                        </button>

                        <ProfileCard
                            avatarUrl={selectedMember.image}
                            name={selectedMember.name}
                            title={selectedMember.designation}
                            handle={selectedMember.post}
                            status={selectedMember.committeeType === 'sophomore' ? '2nd Year' : 'Junior'}
                            ieee_profile={selectedMember.ieeeProfile}
                            linkedin_profile={selectedMember.linkedin}
                            email={selectedMember.email}
                            contactText="Connect"
                            behindGlowColor="rgba(0, 98, 155, 0.55)"
                            innerGradient="linear-gradient(145deg,#00629B8c 0%,#BA0C2F44 100%)"
                            onContactClick={() => setShowLinksMenu(v => !v)}
                        />

                        {showLinksMenu && (
                            <div
                                className="absolute z-30 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                                style={{ bottom: '84px', right: '20px', minWidth: '190px' }}
                                onClick={e => e.stopPropagation()}
                            >
                                <a
                                    href={`mailto:${selectedMember.email}`}
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <FaEnvelope className="text-ieee-blue w-4 h-4" />
                                    Email
                                </a>
                                {selectedMember.linkedin && (
                                    <a
                                        href={selectedMember.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                    >
                                        <FaLinkedin className="text-ieee-blue w-4 h-4" />
                                        LinkedIn
                                    </a>
                                )}
                                {selectedMember.ieeeProfile && (
                                    <a
                                        href={selectedMember.ieeeProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                    >
                                        <FaUser className="text-ieee-blue w-4 h-4" />
                                        IEEE Profile
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SophomoreGallery;

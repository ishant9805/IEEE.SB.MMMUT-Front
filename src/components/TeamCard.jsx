import React from 'react';
import '../styles/teamCard.css';

const TeamCard = ({ name, position, image }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-image" />
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

export default TeamCard;
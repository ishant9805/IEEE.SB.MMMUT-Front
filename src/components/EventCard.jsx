import React from 'react';
import '../styles/eventCard.css';

const EventCard = ({ title, date, description, image }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <div className="event-details">
        <h3>{title}</h3>
        <p className="event-date">{date}</p>
        <p className="event-description">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
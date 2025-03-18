import React from 'react';

const PostHolderCard = ({ name, position, image }) => {
  return (
    <div className="post-holder-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

export default PostHolderCard;
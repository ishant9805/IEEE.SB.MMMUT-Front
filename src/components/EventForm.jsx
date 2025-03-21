import { useState } from 'react';
import { createEvent, updateEvent } from '../api/events';

const EventForm = ({ selectedEvent, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    link: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form if editing an event
  useState(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Event_poster'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dxvyvt3bm/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append all fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('time', formData.time);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);
  
    // Append the image file
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image); // Field name must be "image"
    }
  
    try {
      const token = localStorage.getItem('token');
      if (selectedEvent) {
        await updateEvent(selectedEvent._id, formDataToSend, token);
      } else {
        await createEvent(formDataToSend, token);
      }
      onSuccess();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" aria-label="Event Form">
      <h3 className="text-xl font-bold text-ieee-blue mb-4">
        {selectedEvent ? 'Edit Event' : 'Create Event'}
      </h3>
      {error && (
        <div className="mb-4 text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
          aria-label="Title"
        />
        <input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
          aria-label="Date"
        />
        <input
          type="time"
          placeholder="Time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full p-2 border rounded"
          required
          aria-label="Time"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows="4"
          required
          aria-label="Description"
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full p-2 border rounded"
          aria-label="Link"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="w-full p-2 border rounded"
          aria-label="Event Poster"
        />
        <button
          type="submit"
          className="bg-ieee-blue text-white px-4 py-2 rounded hover:bg-ieee-blue/90 disabled:opacity-50"
          disabled={isLoading}
          aria-label={selectedEvent ? 'Update Event' : 'Create Event'}
        >
          {isLoading ? 'Submitting...' : (selectedEvent ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
import { useState, useEffect } from 'react'; // ✅ Use useEffect
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
  const [isUploading, setIsUploading] = useState(false); // ✅ Track image upload state
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // ✅ Show image preview

  // Pre-fill form if editing an event
  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
      setImagePreview(selectedEvent.image); // Set image preview for editing
    }
  }, [selectedEvent]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Event_poster'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'dxvyvt3bm'); // Replace with your Cloudinary cloud name

    try {
      setIsUploading(true); // Start loading for image upload
      const response = await fetch('https://api.cloudinary.com/v1_1/dxvyvt3bm/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setIsUploading(false); // Stop loading for image upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let imageUrl = formData.image;

      // If a new image is uploaded, upload it to Cloudinary
      if (formData.image instanceof File) {
        imageUrl = await handleImageUpload(formData.image);
      }

      // Prepare the data to send to the backend
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        link: formData.link,
        image: imageUrl, // Use the Cloudinary URL
      };

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      if (selectedEvent) {
        await updateEvent(selectedEvent._id, eventData, token);
      } else {
        await createEvent(eventData, token);
      }

      // Reset form after success
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
        link: '',
        image: '',
      });
      setImagePreview(''); // Clear image preview

      onSuccess(); // Trigger success callback
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message || 'Failed to save event');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show preview of the selected image
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Poster</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            aria-label="Event Poster"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Event Poster Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-ieee-blue text-white px-4 py-2 rounded hover:bg-ieee-blue/90 disabled:opacity-50"
          disabled={isLoading || isUploading} // Disable button during loading or upload
          aria-label={selectedEvent ? 'Update Event' : 'Create Event'}
        >
          {isLoading || isUploading ? 'Submitting...' : selectedEvent ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
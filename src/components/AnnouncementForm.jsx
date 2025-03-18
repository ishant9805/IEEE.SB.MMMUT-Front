import { useState, useEffect } from 'react';
import { createAnnouncement, updateAnnouncement } from '../api/announcements';

const AnnouncementForm = ({ selectedAnnouncement, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedAnnouncement) {
      setFormData(selectedAnnouncement);
    }
  }, [selectedAnnouncement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Validate URL if provided
    if (formData.link && !formData.link.startsWith('http')) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      setIsLoading(false);
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      if (!token) {
        throw new Error('Unauthorized: No token provided.');
      }
  
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement._id, formData, token); // Pass token
      } else {
        await createAnnouncement(formData, token); // Pass token
      }
      onSuccess();
      setFormData({ title: '', content: '', link: '' }); // Reset form
    } catch (err) {
      console.error('Error in handleSubmit:', err); // Log the full error
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" aria-label="Announcement Form">
      <h3 className="text-xl font-bold text-ieee-blue mb-4">
        {selectedAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
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
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded"
          rows="4"
          required
          aria-label="Content"
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full p-2 border rounded"
          aria-label="Link"
        />
        <button
          type="submit"
          className="bg-ieee-blue text-white px-4 py-2 rounded hover:bg-ieee-blue/90 disabled:opacity-50"
          disabled={isLoading}
          aria-label={selectedAnnouncement ? 'Update Announcement' : 'Create Announcement'}
        >
          {isLoading ? 'Submitting...' : (selectedAnnouncement ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
import { useState, useEffect } from 'react';
import { getAnnouncements, deleteAnnouncement } from '../api/announcements';
import AnnouncementForm from '../components/AnnouncementForm';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
  };

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    fetchAnnouncements();
  };

  return (
    <div >
      <h2 className="text-2xl font-bold text-ieee-blue mb-6 ">Manage Announcements</h2>

      {/* Announcement Form */}
      <AnnouncementForm
        selectedAnnouncement={selectedAnnouncement}
        onSuccess={() => {
          setSelectedAnnouncement(null);
          fetchAnnouncements();
        }}
      />

      {/* Announcements List */}
      <div className="mt-8">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-xl font-bold text-ieee-blue">{announcement.title}</h3>
            <p className="text-gray-600 mt-2">{announcement.content}</p>
            {announcement.link && (
              <a
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ieee-blue hover:underline"
              >
                Learn More
              </a>
            )}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setSelectedAnnouncement(announcement)}
                className="text-ieee-blue hover:text-ieee-red"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(announcement._id)}
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

export default AdminAnnouncements;
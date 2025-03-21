import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../api/events';
import EventForm from '../components/EventForm';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteEvent(id, token);
      fetchEvents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-ieee-blue mb-6">Manage Events</h2>

      {/* Event Form */}
      <EventForm
        selectedEvent={selectedEvent}
        onSuccess={() => {
          setSelectedEvent(null);
          fetchEvents();
        }}
      />

      {/* Events List */}
      <div className="mt-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-xl font-bold text-ieee-blue">{event.title}</h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-gray-500 text-sm mt-2">
              <span className="font-semibold">Date:</span> {event.date} | <span className="font-semibold">Time:</span> {event.time}
            </p>
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            )}
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ieee-blue hover:underline"
              >
                Learn More
              </a>
            )}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setSelectedEvent(event)}
                className="text-ieee-blue hover:text-ieee-red"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
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

export default AdminEvents;
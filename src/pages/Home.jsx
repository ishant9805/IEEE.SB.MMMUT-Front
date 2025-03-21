import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import GalleryCarousel from '../components/GalleryCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBullhorn, FaExternalLinkAlt, FaCalendarAlt, FaQuoteLeft } from 'react-icons/fa';
import { getAnnouncements } from '../api/announcements'; // Import the API function
import { getEvents } from '../api/events'; // Import the API function for events

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]); // State for upcoming events

  // Fetch announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch upcoming events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 bg-transparent">
      <HeroSection />

      {/* Announcement and Upcoming Events Section */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
        {/* Announcement Card */}
        <div
          className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 z-10 
               border border-white/20 hover:bg-white/60 w-full max-w-2xl mx-auto"
        >
          <div className="flex items-center mb-3">
            <FaBullhorn className="text-ieee-blue text-lg sm:text-xl mr-2" />
            <h2 className="text-base sm:text-lg font-bold text-ieee-blue">Announcements & News</h2>
          </div>
          <ul>
            {announcements.map((announcement, index) => (
              <a
                key={announcement._id}
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3 p-2 sm:p-3 rounded-lg hover:bg-white/40 transition-all duration-200 
                     relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                     after:bg-ieee-blue after:transition-all after:duration-300 hover:after:w-full
                     group overflow-hidden"
              >
                {/* Highlight Recent Announcement */}
                {index === 0 && (
                  <>
                    {/* Animated Gradient Background */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ieee-blue/10 via-white/10 to-ieee-blue/10 animate-gradient-x pointer-events-none"></div>
                    {/* New Badge */}
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-ieee-red text-white px-1 sm:px-2 py-1 rounded-full text-xs font-semibold animate-bounce">
                      New!
                    </div>
                  </>
                )}
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base relative z-10 group-hover:text-ieee-blue transition-colors duration-200">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm relative z-10 group-hover:text-gray-800 transition-colors duration-200">
                  {announcement.content}
                </p>
                {/* Link Indicator */}
                {announcement.link && (
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-400 group-hover:text-ieee-blue transition-colors duration-200">
                    <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                )}
              </a>
            ))}
          </ul>
        </div>

        {/* Upcoming Events Card */}
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 z-10 
               border border-white/20 hover:bg-white/60 flex flex-col">
          <div className="flex items-center mb-3">
            <FaCalendarAlt className="text-ieee-blue text-lg sm:text-xl mr-2" />
            <h2 className="text-base sm:text-lg font-bold text-ieee-blue">Upcoming Events</h2>
          </div>

          <ul>
            {events.map((event) => (
              <a
                key={event.id}
                href={event.link}
                className="block mb-4 p-3 rounded-lg hover:bg-white/40 transition-all duration-200 
                     relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                     after:bg-ieee-blue after:transition-all after:duration-300 hover:after:w-full
                     group overflow-hidden"
              >
                {/* Event Poster Image */}
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Event Details */}
                <h3 className="text-lg font-bold text-gray-800 relative z-10 group-hover:text-ieee-blue transition-colors duration-200 mb-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm relative z-10 group-hover:text-gray-800 transition-colors duration-200 mb-2">
                  {event.description}
                </p>
                <p className="text-gray-500 text-xs">
                  <span className="font-semibold">Date:</span> {event.date} | <span className="font-semibold">Time:</span> {event.time}
                </p>
              </a>
            ))}
          </ul>
        </div>
      </div>



      {/* Message from Advisor Card - Full Width */}
      <div className="container mx-auto p-6 bg-transparent">
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 z-10 
             border border-white/20 hover:bg-white/60 flex flex-col w-full">
          <div className="flex items-center mb-4">
            <FaQuoteLeft className="text-ieee-blue text-2xl mr-2" />
            <h2 className="text-xl font-bold text-ieee-blue">Message from Advisor</h2>
          </div>

          <div className="relative flex-grow">
            {/* Image and text container */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <img
                src="ProfPTiwari.jpeg" // Replace with the actual image path
                alt="Advisor Name"
                className="w-32 h-40 md:w-40 md:h-40 lg:w-48 lg:h-72 rounded-full border-4 border-ieee-blue 
                 object-cover hover:scale-105 transition-transform shadow-lg"
              />
              <blockquote className="text-gray-700 italic flex-1 text-center md:text-left">
                "As the Advisor of the IEEE Student Branch at MMMUT, I am thrilled to see the enthusiasm and dedication of our students. Our branch is committed to providing a platform for students to explore the latest technological advancements, engage in meaningful projects, and develop leadership skills. Together, we aim to create a community that fosters innovation and excellence. Let's continue to push the boundaries of technology and make a positive impact on the world!"
              </blockquote>
            </div>

            {/* Quote icon at bottom-right */}
            <div className="absolute -bottom-4 right-0 text-ieee-blue text-4xl opacity-20">
              <FaQuoteLeft />
            </div>
          </div>

          {/* Name attribution */}
          <div className="mt-6 pt-4 border-t border-white/30">
            <p className="text-lg lg:text-xl font-semibold text-ieee-blue text-right">
              Prof. Prabhakar Tiwari
            </p>
            <p className="text-gray-600 text-sm lg:text-base text-right">
              Advisor IEEE-STB MMMUT
            </p>
          </div>
        </div>
      </div>

      {/* Message from Counselor Card - Full Width */}
      <div className="container mx-auto p-6 bg-transparent">
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 z-10 
             border border-white/20 hover:bg-white/60 flex flex-col w-full">
          <div className="flex items-center mb-4">
            <FaQuoteLeft className="text-ieee-red text-2xl mr-2" />
            <h2 className="text-xl font-bold text-ieee-red">Message from Counselor</h2>
          </div>

          <div className="relative flex-grow">
            {/* Image and text container */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <img
                src="Councellor.jpg"
                alt="Dr. Shikha Singh"
                className="w-32 h-40 md:w-40 md:h-40 lg:w-48 lg:h-72 rounded-full border-4 border-ieee-red 
                 object-cover hover:scale-105 transition-transform shadow-lg"
              />
              <blockquote className="text-gray-700 italic flex-1 text-center md:text-left">
                "Welcome to the IEEE Student Branch! We are dedicated to fostering innovation, collaboration, and excellence among students. Our mission is to provide a platform where aspiring engineers, researchers, and technology enthusiasts can come together to learn, create, and grow. Through workshops, competitions, networking opportunities, and hands-on projects, we aim to empower students with the skills and knowledge needed to shape the future of technology. Join us in this journey of exploration and discovery, and let's work together to drive meaningful change and make a lasting impact on society!"
              </blockquote>
            </div>

            {/* Quote icon at bottom-right */}
            <div className="absolute -bottom-4 right-0 text-ieee-red text-4xl opacity-20">
              <FaQuoteLeft />
            </div>
          </div>

          {/* Name attribution */}
          <div className="mt-6 pt-4 border-t border-white/30">
            <p className="text-lg lg:text-xl font-semibold text-ieee-red text-right">
              Dr. Shikha Singh
            </p>
            <p className="text-gray-600 text-sm lg:text-base text-right">
              Counselor IEEE-STB MMMUT
            </p>
          </div>
        </div>
      </div>

      <GalleryCarousel />
    </div>
  );
};

export default Home;
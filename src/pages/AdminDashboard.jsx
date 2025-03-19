import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBullhorn, FaCog, FaSignOutAlt, FaEnvelope,
  FaSpinner } from 'react-icons/fa';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Overlay for Mobile Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-ieee-blue to-ieee-blue-dark text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-2xl`}
      >
        <div className="pt-[6.5rem] border-b border-ieee-blue-light">
          <h2 className="text-2xl font-bold px-4">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center p-4 hover:bg-ieee-blue-light transition-all duration-200 ease-in-out hover:pl-6"
          >
            <FaHome className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/admin/announcements"
            className="flex items-center p-4 hover:bg-ieee-blue-light transition-all duration-200 ease-in-out hover:pl-6"
          >
            <FaBullhorn className="mr-3" /> Announcements
          </Link>
          <Link
            to="/admin/contact-submissions"
            className="flex items-center p-4 hover:bg-ieee-blue-light transition-all duration-200 ease-in-out hover:pl-6"
          >
            <FaEnvelope className="mr-3" /> Users
          </Link>
          <button
            onClick={() => {
              // Handle logout
              console.log('Logged out');
            }}
            className="w-full flex items-center p-4 hover:bg-ieee-blue-light transition-all duration-200 ease-in-out hover:pl-6 text-left"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 mt-[4.5rem]">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-ieee-blue hover:text-ieee-blue-dark focus:outline-none transition-transform duration-200 hover:scale-110"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-xl font-bold text-ieee-blue">Admin Dashboard</h1>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8 bg-transparent min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

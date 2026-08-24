import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaHome, FaUsers, FaCalendarAlt, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import AdminLoginModal from './AdminLoginModal';
import { logoutAdmin } from '../api/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-ieee-blue text-white p-4 shadow-xl fixed w-full z-5000000 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img src="/Final_IEEE NEW LOGO (1).png" alt="IEEE-SB-MMMUT" className="h-10" />
            <span className="text-xl font-extrabold tracking-wide">IEEE STB MMMUT</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                    : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                }`
              }
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                    : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                }`
              }
            >
              <FaUsers className="mr-2" /> Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                    : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                }`
              }
            >
              <FaCalendarAlt className="mr-2" /> Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                    : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                }`
              }
            >
              <FaEnvelope className="mr-2" /> Contact
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                        : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                    }`
                  }
                >
                  <FaCog className="mr-2" /> Admin
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md transition-all duration-300"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleAdminButtonClick}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md transition-all duration-300"
              >
                <FaUserCircle className="mr-2" /> Admin
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-ieee-blue/95 text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden animate-fade-in backdrop-blur-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                  : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
              }`
            }
            onClick={toggleMenu}
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                  : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
              }`
            }
            onClick={toggleMenu}
          >
            <FaUsers className="mr-2" /> Teams
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                  : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
              }`
            }
            onClick={toggleMenu}
          >
            <FaCalendarAlt className="mr-2" /> Events
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                  : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
              }`
            }
            onClick={toggleMenu}
          >
            <FaEnvelope className="mr-2" /> Contact
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-ieee-red-500 to-ieee-red-700 text-white shadow-lg' // Active state
                      : 'hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md' // Hover state
                  }`
                }
                onClick={toggleMenu}
              >
                <FaCog className="mr-2" /> Admin
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md transition-all duration-300"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleAdminButtonClick}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gradient-to-r from-ieee-red-300 to-ieee-red-500 hover:text-white hover:shadow-md transition-all duration-300"
            >
              <FaUserCircle className="mr-2" /> Admin
            </button>
          )}
        </div>
      )}

      {isModalOpen && <AdminLoginModal onClose={handleCloseModal} setIsLoggedIn={setIsLoggedIn} />}
    </nav>
  );
};

export default Navbar;

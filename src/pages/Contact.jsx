import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, 
    FaGithub, FaLinkedin, FaTwitter, FaInstagram, 
    FaUsers, FaCalendarAlt, FaMicrophone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_URL } from '../api/config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
  
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen bg-white/20 from-blue-50 to-purple-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 rounded-xl shadow-lg p-6  border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-ieee-blue to-purple-600 rounded-lg">
                <FaUsers className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 rounded-xl shadow-lg p-6  border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-ieee-blue to-purple-600 rounded-lg">
                <FaCalendarAlt className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold text-gray-900">10+</div>
                <div className="text-gray-600">Annual Events</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 rounded-xl shadow-lg p-6  border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-ieee-blue to-purple-600 rounded-lg">
                <FaMicrophone className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <div className="text-gray-600">Conferences Hosted</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Have a question or want to collaborate? Drop us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 rounded-2xl shadow-xl p-8 sm:p-12  "
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input block w-full pl-10 pr-3 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue`}
                    placeholder="Enter Your Name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input block w-full pl-10 pr-3 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue`}
                    placeholder="Enter your Email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPaperPlane className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input block w-full pl-10 pr-3 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue`}
                    placeholder="Your subject"
                  />
                </div>
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea block w-full py-3 px-4 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue`}
                    placeholder="Your message..."
                  ></textarea>
                </div>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-ieee-blue to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 rounded-2xl shadow-xl p-8 ">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaMapMarkerAlt className="h-6 w-6 text-ieee-blue" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">Madan Mohan Malviya University of Technology</p>
                    <p className="text-gray-600">Gorakhpur, Uttar Pradesh 273010</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaPhone className="h-6 w-6 text-ieee-blue" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-600">+91 8528855010</p>
                    <p className="text-gray-600">Mon - Fri, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden ">
              <iframe
                title="MMMUT Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.4054633525798!2d83.4305526747799!3d26.731434267858607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915ca3e2aa136b%3A0xc039bdf0211338a9!2sMMM%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1742296041140!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-2xl"
              ></iframe>
            </div>

            <div className="bg-white/80 rounded-2xl shadow-xl p-8 ">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="flex space-x-6 justify-center">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ieee-blue"
                >
                  <FaGithub className="h-8 w-8" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.linkedin.com/company/105633600/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ieee-blue"
                >
                  <FaLinkedin className="h-8 w-8" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ieee-blue"
                >
                  <FaTwitter className="h-8 w-8" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-ieee-blue"
                >
                  <FaInstagram className="h-8 w-8" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Contact = () => {
  return <ContactForm />;
};

export default Contact;

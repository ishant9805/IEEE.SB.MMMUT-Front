import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Floating animation for social icons
  const floatAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: "easeInOut"
    }
  };

  return (
    <footer
      className="bg-ieee-blue/20 border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8"
      style={{ zIndex: 10 }}
    >
      <div className=" bg-white/20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 backdrop-blur-sm bg-ieee-blue/50 p-6 rounded-xl border border-white/10"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FaRocket className="text-ieee-red text-2xl" />
            </motion.div>
            <h3 className="text-xl font-bold text-ieee-red">IEEE SB MMMUT</h3>
          </div>
          <p className="text-white ">
            Pioneering technological innovation through collaborative learning
            and professional development since 2015.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 backdrop-blur-sm bg-ieee-blue/50 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-xl font-bold text-ieee-red">Navigate</h3>
          <ul className="space-y-3">
            {['Home', 'Teams', 'Events', 'Contact'].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a
                  href={`/${link.toLowerCase()}`}
                  className="text-white hover:text-ieee-red flex items-center group transition-all"
                >
                  <span className="w-2 h-2 bg-ieee-red rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4 backdrop-blur-sm bg-ieee-blue/50 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-xl font-bold text-ieee-red">Reach Us</h3>
          <ul className="space-y-3 text-white">
            <motion.li
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaMapMarkerAlt className="mr-3 text-ieee-red flex-shrink-0" />
              <span>MMMUT Campus, Gorakhpur</span>
            </motion.li>
            <motion.li
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaEnvelope className="mr-3 text-ieee-red flex-shrink-0" />
              <span>contact@ieeesbmmmut.in</span>
            </motion.li>
            <motion.li
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FaPhone className="mr-3 text-ieee-red flex-shrink-0" />
              <span>+91 9219998403</span>
            </motion.li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4 backdrop-blur-sm bg-ieee-blue/50 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-xl font-bold text-ieee-red">Connect</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FaFacebook, color: '#3b5998' },
              { icon: FaTwitter, color: '#1DA1F2' },
              { icon: FaLinkedin, color: '#0077b5' },
              { icon: FaInstagram, color: '#E1306C' }
            ].map((platform, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{
                  scale: 1.1,
                  background: `linear-gradient(45deg, ${platform.color}, ${platform.color}00)`
                }}
                animate={floatAnimation}
                className="p-3 rounded-lg bg-white/10 flex items-center justify-center hover:shadow-lg transition-all"
              >
                <platform.icon className="h-6 w-6" style={{ color: platform.color }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="border-t border-white/10 mt-8 pt-8 text-center"
      >
        <p className="text-black-300 text-sm font-bold tracking-wide">
          © {currentYear} IEEE SB MMMUT •
          <span className="mx-2">|</span>
          <motion.span
            className="inline-block font-bold hover:text-ieee-red cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.span>
          <span className="mx-2">•</span>
          <motion.span
            className="inline-block font-bold hover:text-ieee-red cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Terms of Service
          </motion.span>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
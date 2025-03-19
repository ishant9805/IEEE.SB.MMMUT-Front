import { useState } from 'react';
import { loginAdmin } from '../api/auth'; // Ensure this import is correct

const AdminLoginModal = ({ onClose, setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the login API
      const response = await loginAdmin(credentials);

      // Debug: Log the response
      console.log('Login Response:', response);

      // Check if the token is present in the response
      if (response.token) {
        // Save the token to localStorage
        localStorage.setItem('token', response.token);
        console.log('Token saved to localStorage:', response.token);
      }

      // Update login state in the parent component (Navbar)
      setIsLoggedIn(true);

      // Close the modal
      onClose();

      // Redirect to the admin dashboard
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('❌ Login Failed:', error.message);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt('Enter your email address:');
    if (email) {
      // Call your backend API to send a password reset link
      alert(`A password reset link will be sent to ${email}.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-[400px]">
      {/* Modal Container */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg w-96 relative shadow-lg hover:shadow-xl transition-shadow">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-ieee-blue"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-ieee-blue focus:border-transparent text-black"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
              disabled={isLoading}
              placeholder="Enter your e-mail"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-ieee-blue focus:border-transparent text-black"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-ieee-blue to-purple-600 text-white p-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-ieee-blue hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;

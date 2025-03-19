const API_BASE_URL = "https://ieee-back.vercel.app"; // Change if your backend runs on another port

export const loginAdmin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies if using them for authentication
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Debug: Log the API response
    console.log('API Response:', data);

    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token); // Store the token
    }

    // Return the response data (including token if present)
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    // Clear login status and token from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken'); // Clear the token

    // Optional: Call backend logout endpoint if needed
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Redirect to home page
    window.location.href = '/';
  } catch (error) {
    console.error('Error during logout:', error);
    // Optionally, show an error message to the user
    alert('Logout failed. Please try again.');
  }
};

const API_BASE_URL = "https://ieee-back.vercel.app";

export const loginAdmin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('isLoggedIn', 'true'); // Set login state
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutAdmin = () => {
  // Clear login state and token
  localStorage.removeItem('authToken');
  localStorage.removeItem('isLoggedIn');

  // Optional: Call backend logout endpoint if needed
  fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  // Redirect to home page
  window.location.href = '/';
};

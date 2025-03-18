const API_BASE_URL = "https://ieee-back.vercel.app"; // Change if your backend runs on another port

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include', // Required if using cookies for authentication
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  // Store login status in localStorage
  localStorage.setItem('isLoggedIn', 'true');
  return data;
};

export const logoutAdmin = async () => {
  // Clear login status from localStorage
  localStorage.removeItem('isLoggedIn');

  // Optional: Call backend logout endpoint if needed
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  // Redirect to home page
  window.location.href = '/';
};

// JWT Auth Service for Django backend
const API_BASE = 'http://localhost:8000/api';

const getTokens = () => {
  const tokens = localStorage.getItem('tokens');
  return tokens ? JSON.parse(tokens) : null;
};

const saveTokens = (tokens) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

const clearTokens = () => {
  localStorage.removeItem('tokens');
};

const getAccessToken = () => {
  const tokens = getTokens();
  return tokens?.access || null;
};

/**
 * Authentication service that works with Django backend
 */
export const authService = {
  /**
   * Login a user with username and password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<Object>} user info
   */
  async login(username, password) {
    const res = await fetch(`${API_BASE}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const tokens = await res.json();
    saveTokens(tokens);
    // Optionally fetch user info
    const user = await this.getUserProfile();
    return user;
  },

  /**
   * Register a new user (if API supports it)
   * @param {Object} userData
   * @returns {Promise<Object>} user info
   */
  async register(userData) {
    // Adjust endpoint as per your Django backend
    const res = await fetch(`${API_BASE}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('Registration failed');
    // After registration, login automatically
    return this.login(userData.username, userData.password);
  },

  /**
   * Refresh the access token
   */
  async refreshToken() {
    const tokens = getTokens();
    if (!tokens?.refresh) throw new Error('No refresh token');
    const res = await fetch(`${API_BASE}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: tokens.refresh })
    });
    if (!res.ok) throw new Error('Token refresh failed');
    const data = await res.json();
    saveTokens({ ...tokens, access: data.access });
    return data.access;
  },

  /**
   * Get user profile (requires valid access token)
   * @returns {Promise<Object>} user info
   */
  async getUserProfile() {
    let access = getAccessToken();
    if (!access) throw new Error('Not authenticated');
    let res = await fetch(`${API_BASE}/user/`, {
      headers: { 'Authorization': `Bearer ${access}` }
    });
    // If token expired, try to refresh
    if (res.status === 401) {
      access = await this.refreshToken();
      res = await fetch(`${API_BASE}/user/`, {
        headers: { 'Authorization': `Bearer ${access}` }
      });
    }
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  },

  /**
   * Logout user
   */
  logout() {
    clearTokens();
  }
};

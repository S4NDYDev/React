import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to fetch user profile with stored tokens on mount
    const fetchUser = async () => {
      try {
        const user = await authService.getUserProfile();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function (now expects username)
  const login = async (username, password) => {
    try {
      setError('');
      setLoading(true);
      const user = await authService.login(username, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function (expects username, email, password, etc.)
  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      const newUser = await authService.register(userData);
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    authService.logout();
  };

  // Get user profile (optional userId param for future use)
  const getUserProfile = async (userId) => {
    try {
      setLoading(true);
      return await authService.getUserProfile(userId);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    getUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

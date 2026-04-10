import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5172';
axios.defaults.withCredentials = true;

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
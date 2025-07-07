import axios from 'axios';

const API_BASE_URL = 'https://avaxbacklog.onrender.com/api';

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  };
};

export const retryFetch = async (url, options = {}, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { ...options, timeout: 10000 });
      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

export const apiClient = {
  get: (endpoint, options = {}) => 
    axios.get(`${API_BASE_URL}${endpoint}`, { headers: getAuthHeaders(), timeout: 15000, ...options }),
  
  post: (endpoint, data, options = {}) => 
    axios.post(`${API_BASE_URL}${endpoint}`, data, { headers: getAuthHeaders(), timeout: 15000, ...options }),
  
  put: (endpoint, data, options = {}) => 
    axios.put(`${API_BASE_URL}${endpoint}`, data, { headers: getAuthHeaders(), timeout: 15000, ...options }),
};
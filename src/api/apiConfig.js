import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-shub-production.up.railway.app/api', 
  headers: {
    'Content-Type': 'application/json', 
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

export default apiClient;
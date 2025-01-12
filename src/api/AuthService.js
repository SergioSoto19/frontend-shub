import apiClient from './apiConfig';

const login = (credentials) => {
  return apiClient.post('/login', credentials); 
};

const AuthService = {
  login,
};

export default AuthService;
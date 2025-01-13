import apiClient from './apiConfig';

const login = (credentials) => {
  return apiClient.post('/login', credentials); 
};

export const register = async (data) => {
  return await apiClient.post('/register', data);
};


const AuthService = {
  login,
  register
};

export default AuthService;
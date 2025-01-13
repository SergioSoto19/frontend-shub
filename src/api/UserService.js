import apiClient from './apiConfig';

const getUsers = () => {
  return apiClient.get('/users');
};

const UserService = {
  getUsers,
};

export default UserService;
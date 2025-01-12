import apiClient from './apiConfig';

const getHotels = () => {
  return apiClient.get('/hotels');
};

const HotelService = {
  getHotels,
};

export default HotelService;
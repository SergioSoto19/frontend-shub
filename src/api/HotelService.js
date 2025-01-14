import apiClient from './apiConfig';

const getHotels = () => {
  return apiClient.get('/hotels');
};

const deleteHotel = (id) => {
  return apiClient.delete(`/hotels/${id}`);
};

const createHotel = (data) => {
  return apiClient.post('/hotels', data);
};


const HotelService = {
  getHotels,
  deleteHotel, 
  createHotel
};

export default HotelService;
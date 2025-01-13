import apiClient from './apiConfig';

const getHotels = () => {
  return apiClient.get('/hotels');
};

const deleteHotel = (id) => {
  return apiClient.delete(`/hotels/${id}`);
};

const HotelService = {
  getHotels,
  deleteHotel, 
};

export default HotelService;
import apiClient from './apiConfig';

const getReservations = () => {
  return apiClient.get('/reservations');
};

const deleteReservation = (id) => {
  return apiClient.delete(`/reservations/${id}`);
};

const createReservation = (data) => {
  const formattedData = {
    ...data,
    user_id: parseInt(data.user_id, 10),
    hotel_id: parseInt(data.hotel_id, 10),
  };
  console.log('formattedData', formattedData);
  return apiClient.post('/reservations', formattedData);
};
const ReservationService = {
  getReservations,
  deleteReservation,
  createReservation, 
};

export default ReservationService;
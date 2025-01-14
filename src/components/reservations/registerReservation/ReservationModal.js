import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReservationService from '../../../api/ReservationService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const RegisterReservationModal = ({ show, handleClose, onReservationAdded }) => {
  const [userId, setUserId] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    validateForm(e.target.value, hotelId, checkInDate, checkOutDate);
  };

  const handleHotelIdChange = (e) => {
    setHotelId(e.target.value);
    validateForm(userId, e.target.value, checkInDate, checkOutDate);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
    validateForm(userId, hotelId, e.target.value, checkOutDate);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
    validateForm(userId, hotelId, checkInDate, e.target.value);
  };

  const validateForm = (userId, hotelId, checkInDate, checkOutDate) => {
    const isUserIdValid = userId.length > 0;
    const isHotelIdValid = hotelId.length > 0;
    const isCheckInDateValid = checkInDate.length > 0;
    const isCheckOutDateValid = checkOutDate.length > 0;
    setIsFormValid(isUserIdValid && isHotelIdValid && isCheckInDateValid && isCheckOutDateValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedCheckInDate = format(new Date(checkInDate), "yyyy-MM-dd'T'HH:mm");
      const formattedCheckOutDate = format(new Date(checkOutDate), "yyyy-MM-dd'T'HH:mm");
      const response = await ReservationService.createReservation({
        user_id: userId,
        hotel_id: hotelId,
        check_in_date: formattedCheckInDate,
        check_out_date: formattedCheckOutDate,
      });
      toast.success(response.data.message || 'Reserva agregada exitosamente');
      onReservationAdded();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error al agregar la reserva');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID del Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el ID del usuario"
              value={userId}
              onChange={handleUserIdChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ID del Hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el ID del hotel"
              value={hotelId}
              onChange={handleHotelIdChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Check-in</Form.Label>
            <Form.Control
              type="datetime-local"
              value={checkInDate}
              onChange={handleCheckInDateChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Check-out</Form.Label>
            <Form.Control
              type="datetime-local"
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
              required
            />
          </Form.Group>
          <Button className="button-Custom" type="submit" disabled={!isFormValid}>
            Agregar Reserva
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterReservationModal;
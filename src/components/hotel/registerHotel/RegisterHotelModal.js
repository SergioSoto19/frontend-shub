import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import HotelService from '../../../api/HotelService';
import { toast } from 'react-toastify';

const RegisterHotelModal = ({ show, handleClose, onHotelAdded }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm(e.target.value, location);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    validateForm(name, e.target.value);
  };

  const validateForm = (name, location) => {
    const isNameValid = name.length > 0;
    const isLocationValid = location.length > 0;
    setIsFormValid(isNameValid && isLocationValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await HotelService.createHotel({ name, location });
      toast.success(response.data.message || 'Hotel agregado exitosamente');
      onHotelAdded();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error al agregar el hotel');
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del hotel"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección del Hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la dirección del hotel"
              value={location}
              onChange={handleLocationChange}
              required
            />
          </Form.Group>
          <Button className="button-Custom" type="submit" disabled={!isFormValid}>
            Agregar Hotel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterHotelModal;
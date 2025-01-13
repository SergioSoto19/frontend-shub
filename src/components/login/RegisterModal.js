import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AuthService from '../../api/AuthService';
import { toast } from 'react-toastify';


const RegisterModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); 
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm(email, e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length > 0;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register({ email, password, userType });
      toast.success('Registro exitoso');
      handleClose();
    } catch (error) {
      toast.error('Error al registrar');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              className='form-control'
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className='form-control'
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de usuario</Form.Label>
            <Form.Control
              as="select"
              value={userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Control>
          </Form.Group>
          <Button className="button-Custom" type="submit" disabled={!isFormValid}>
            Registrarse
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
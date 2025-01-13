import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import star from '../../assets/mar.jpg';
import RegisterModal from './RegisterModal';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
        const response = await AuthService.login({ email, password });
        setAuthData(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
           toast.error(error.response.data.message);
        } else {
          toast.error('Error al iniciar sesión');
        }
    } finally {
        setLoading(false);
    }
};

return (
  <div>
    <div className="login-container row justify-content-center align-items-center shadow-lg" id="login-container">
      <div className="col-md-6 login-logo">
        <img src={star} alt="Logo" className="responsive-logo" />
      </div>
      <div className="col-md-6 login-form">
        <h2>Bienvenido</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="form-group">
            <Form.Control
              type="email"
              placeholder="Correo electrónico o usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="button-container">
            <Button type="submit" className="button-Custom" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
          </div>
          <div className="sesionContainer">
            <small>
              <a
                href="#"
                className="sesion"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowRegisterModal();
                }}
              >
                Registrarse
              </a>
            </small>
          </div>
        </Form>
      </div>
    </div>
    <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
  </div>
);
};

export default Login;
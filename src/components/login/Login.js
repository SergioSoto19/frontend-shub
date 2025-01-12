import React, { useState, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.PNG';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reinicia el mensaje de error

    try {
        const response = await AuthService.login({ email, password });
        setAuthData(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/reservations');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            setError('error.');
        }
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <div className="login-container row justify-content-center align-items-center d-flex shadow-lg" id="login-container">
        <div className="margin-le"></div>
        <div className="col-md-6 login-logo">
          <img src={logo} alt="P&A Logo" className="responsive-logo" />
        </div>
        <div className="col-md-6 login-form">
          <div className="row cont-1"></div>
          <div className="formulario row" id="formulario">
            <h2>Bienvenido</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group className="form-group">
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
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
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="button-container">
                <Button type="submit" className="login-btn">Login</Button>
              </div>
              <div className="reset-password">
                <small>
                  <a href="/forgot-password" className="forgot-password" onClick={(e) => {
                    e.preventDefault();
                    navigate('/change-password');
                  }}>¿Olvidaste tu contraseña?</a>
                </small>
              </div>
            </Form>
          </div>
          <div className="row"></div>
        </div>
        {loading && (
          <div className="loading-overlay">
            <Spinner animation="border" size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
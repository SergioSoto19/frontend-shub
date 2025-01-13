import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/router';
import AuthProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import './general.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
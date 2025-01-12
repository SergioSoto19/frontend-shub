import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/Login';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default AppRouter;
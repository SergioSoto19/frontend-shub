import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/login/Login';
import Dashboard from  '../components/home/Dashboard';
import UserList from '../components/user/listUser/UserList';
import HotelList from '../components/hotel/HotelList';
import ReservationList from '../components/reservations/reservationList/ReservationList';


function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard/>}>
        <Route path="users" element={<UserList />} />
        <Route path="hotels" element={<HotelList/>} />
        <Route path="reservations" element={<ReservationList/>} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
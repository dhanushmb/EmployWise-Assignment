import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import EditUser from './pages/EditUser';
import './index.css';

const token = localStorage.getItem('token');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/users" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem('token') ? true : false;

  return (
    isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;

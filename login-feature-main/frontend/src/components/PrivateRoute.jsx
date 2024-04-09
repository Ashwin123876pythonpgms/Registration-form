// PrivateRoute.js
import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...props }) => {
  // Check if the user is authenticated (you can replace this with your actual authentication logic)
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
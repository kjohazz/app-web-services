import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;

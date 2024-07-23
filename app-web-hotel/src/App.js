import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/ProtectedRoute'; // Nuevo componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>  {/* Ruta protegida */}
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

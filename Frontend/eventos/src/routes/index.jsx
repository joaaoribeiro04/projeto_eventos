import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login'; // Importação corrigida
import { Register } from '../pages/Register'; // Importação corrigida
import Principal from '../pages/Principal';
import Eventos from '../pages/Eventos';
import Historico from '../pages/Historico';
import Visualizacao from '../pages/Visualizacao';
import Admin from '../pages/Admin';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Principal />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/visualizacao/:id" element={<Visualizacao />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

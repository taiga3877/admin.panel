import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import routers from './RouterDom.jsx'; // Импорт маршрутов
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} /> {/* Используем только RouterProvider */}
  </StrictMode>
);

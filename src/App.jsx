import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './element/Header/header';
import Form from './pages/Login/page';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [token, location.pathname, navigate]);

  if (!token && location.pathname !== '/login') {
    return <Form />;
  }

  return (
    <div className="flex">
      {/* Показывай Header только если не на /login */}
      {location.pathname !== '/login' && token && <Header />}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <ToastContainer />
    </div>
  );
};

export default App;

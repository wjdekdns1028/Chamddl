import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Services    from './components/Services';
import Process     from './components/Process';
import Notice      from './components/Notice';
import Contact     from './components/Contact';
import Location    from './components/Location';
import Footer      from './components/Footer';
import Toast       from './components/Toast';
import AdminPage    from './pages/AdminPage';
import LoginPage    from './pages/LoginPage';
import PrivateBoard from './pages/PrivateBoard';
import { useAdmin } from './hooks/useAdmin';

function HomePage() {
  const { isAdmin } = useAdmin();
  const [toast, setToast] = useState('');
  const [noticeKey, setNoticeKey] = useState(0);

  const showToast = useCallback((msg) => {
    setToast('');
    setTimeout(() => setToast(msg), 10);
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <Hero />
      <About />
      <Services />
      <Process />
      <Notice key={noticeKey} isAdmin={false} />
      <Contact onToast={showToast} />
      <Location />
      <Footer />
      <Toast message={toast} isAdmin={false} />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<HomePage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/board"  element={<PrivateBoard />} />
        <Route path="/admin"  element={
          <ProtectedRoute><AdminPage /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAdmin }) {
  const navigate = useNavigate();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        참<span>뜰</span> 심리상담소
      </div>
      <ul className="nav-links">
        <li><button onClick={() => scrollTo('about')}>상담소 소개</button></li>
        <li><button onClick={() => scrollTo('services')}>상담 프로그램</button></li>
        <li><button onClick={() => scrollTo('process')}>상담 절차</button></li>
        <li><button onClick={() => scrollTo('notice')}>공지사항</button></li>
        <li><button onClick={() => scrollTo('contact')}>상담 예약</button></li>
        <li><button onClick={() => navigate('/board')}>문의</button></li>
        <li>
          {isAdmin ? (
            <button className="nav-admin-subtle" onClick={() => navigate('/admin')}>
              ⚙
            </button>
          ) : (
            <button className="nav-admin-subtle" onClick={() => navigate('/login')}>
              ⚙
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

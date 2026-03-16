import React from 'react';
import './AdminBar.css';

export default function AdminBar({ onOpenWrite, onLogout }) {
  return (
    <div className="admin-bar">
      <div className="admin-bar-left">
        <div className="admin-dot" />
        <span>관리자 모드</span>
      </div>
      <div className="admin-bar-btns">
        <button className="btn-admin" onClick={onOpenWrite}>+ 공지 작성</button>
        <button className="btn-admin-outline" onClick={onLogout}>로그아웃</button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { login } from '../api';
import './Modal.css';

export default function LoginModal({ onClose, onLogin, onToast }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !pw) { onToast('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    try {
      const res = await login(id, pw);
      onLogin(res.data.token);
      onClose();
      onToast('✅ 관리자로 로그인되었습니다.');
    } catch {
      onToast('❌ 아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>관리자 로그인</h2>
        <p className="modal-subtitle">관리자 계정으로 로그인하세요.</p>
        <div className="form-group">
          <label>아이디</label>
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="admin" />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password" value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <button className="form-submit" onClick={handleLogin} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </div>
  );
}

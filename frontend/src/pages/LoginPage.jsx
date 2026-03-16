import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAdmin } from '../hooks/useAdmin';
import './LoginPage.css';

export default function LoginPage() {
  const { isAdmin, loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) navigate('/admin');
  }, [isAdmin, navigate]);

  const handleLogin = async () => {
    if (!id || !pw) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true); setError('');
    try {
      const res = await login(id, pw);
      loginAdmin(res.data.token);
      navigate('/admin');
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-wrap">
      <div className="lp-bg-circle lp-c1" />
      <div className="lp-bg-circle lp-c2" />
      <div className="lp-card">
        <div className="lp-logo">참<span>뜰</span></div>
        <p className="lp-subtitle">관리자 로그인</p>
        <div className="lp-form">
          <div className="lp-writebox">
            <div className="lp-group">
              <label>아이디</label>
              <input
                value={id} onChange={(e) => setId(e.target.value)}
                placeholder="admin"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="lp-group">
              <label>비밀번호</label>
              <input
                type="password" value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>
          {error && <p className="lp-error">{error}</p>}
          <button className="lp-btn" onClick={handleLogin} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <a className="lp-back" href="/">← 홈으로 돌아가기</a>
        </div>
      </div>
    </div>
  );
}

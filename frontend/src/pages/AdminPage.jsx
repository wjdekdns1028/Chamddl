import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotices, createNotice, deleteNotice, getContacts, getAdminBoard, deleteBoardPost } from '../api';
import { useAdmin } from '../hooks/useAdmin';
import './AdminPage.css';

const BADGE = {
  NOTICE: { label: '공지', cls: 'badge-notice' },
  INFO:   { label: '안내', cls: 'badge-info' },
  EVENT:  { label: '이벤트', cls: 'badge-event' },
};

function Toast({ msg }) {
  return msg ? <div className="ap-toast show">{msg}</div> : null;
}

export default function AdminPage() {
  const { isAdmin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const [tab, setTab] = useState('notices'); // 'notices' | 'contacts' | 'board'
  const [notices, setNotices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // 공지 작성 폼 상태
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'NOTICE' });
  const [formLoading, setFormLoading] = useState(false);

  // 선택된 문의 상세
  const [selectedContact, setSelectedContact] = useState(null);
  const [board, setBoard] = useState([]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  // 비로그인 시 메인으로
  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin, navigate]);

  const fetchNotices = useCallback(async () => {
    try {
      const res = await getNotices();
      setNotices(res.data);
    } catch { showToast('공지사항을 불러오지 못했습니다.'); }
  }, [showToast]);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await getContacts();
      setContacts(res.data);
    } catch { showToast('문의내역을 불러오지 못했습니다.'); }
  }, [showToast]);

  const fetchBoard = useCallback(async () => {
    try {
      const res = await getAdminBoard();
      setBoard(res.data);
    } catch { showToast('비공개 문의를 불러오지 못했습니다.'); }
  }, [showToast]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([fetchNotices(), fetchContacts(), fetchBoard()]).finally(() => setLoading(false));
  }, [isAdmin, fetchNotices, fetchContacts]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await deleteNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      showToast('삭제되었습니다.');
    } catch { showToast('삭제에 실패했습니다.'); }
  };

  const handleCreateNotice = async () => {
    if (!form.title.trim()) { showToast('제목을 입력하세요.'); return; }
    if (!form.content.trim()) { showToast('내용을 입력하세요.'); return; }
    setFormLoading(true);
    try {
      const res = await createNotice(form);
      setNotices((prev) => [res.data, ...prev]);
      setForm({ title: '', content: '', category: 'NOTICE' });
      setShowForm(false);
      showToast('✅ 공지사항이 등록되었습니다.');
    } catch { showToast('등록에 실패했습니다.'); }
    finally { setFormLoading(false); }
  };

  if (!isAdmin) return null;

  return (
    <div className="ap-wrap">
      {/* ── SIDEBAR ── */}
      <aside className="ap-sidebar">
        <div className="ap-logo">참<span>뜰</span></div>
        <p className="ap-logo-sub">관리자 페이지</p>
        <nav className="ap-nav">
          <button
            className={`ap-nav-item ${tab === 'notices' ? 'active' : ''}`}
            onClick={() => setTab('notices')}
          >
            <span className="ap-nav-icon">📋</span> 공지사항 관리
          </button>
          <button
            className={`ap-nav-item ${tab === 'contacts' ? 'active' : ''}`}
            onClick={() => setTab('contacts')}
          >
            <span className="ap-nav-icon">📬</span> 상담 신청 관리
            {contacts.length > 0 && (
              <span className="ap-count">{contacts.length}</span>
            )}
          </button>
          <button
            className={`ap-nav-item ${tab === 'board' ? 'active' : ''}`}
            onClick={() => setTab('board')}
          >
            <span className="ap-nav-icon">🔒</span> 비공개 문의
            {board.length > 0 && (
              <span className="ap-count">{board.length}</span>
            )}
          </button>
        </nav>
        <div className="ap-sidebar-footer">
          <button className="ap-back-btn" onClick={() => navigate('/')}>← 홈으로</button>
          <button className="ap-logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="ap-main">
        {/* Header */}
        <header className="ap-header">
          <div>
            <h1 className="ap-header-title">
              {tab === 'notices' ? '공지사항 관리' : tab === 'contacts' ? '상담 신청 관리' : '비공개 문의 관리'}
            </h1>
            <p className="ap-header-desc">
              {tab === 'notices'
                ? `총 ${notices.length}개의 공지사항이 있습니다.`
                : tab === 'contacts'
                ? `총 ${contacts.length}건의 상담 신청이 있습니다.`
                : `총 ${board.length}건의 비공개 문의가 있습니다.`}
            </p>
          </div>
          {tab === 'notices' && (
            <button className="ap-create-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? '✕ 닫기' : '+ 새 공지 작성'}
            </button>
          )}
        </header>

        {loading && <div className="ap-loading">불러오는 중...</div>}

        {/* ── 공지 작성 폼 ── */}
        {tab === 'notices' && showForm && (
          <div className="ap-form-card">
            <h3 className="ap-form-title">새 공지사항 작성</h3>
            <div className="ap-form-row">
              <div className="ap-form-group" style={{ flex: '0 0 140px' }}>
                <label>카테고리</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="NOTICE">공지</option>
                  <option value="INFO">안내</option>
                  <option value="EVENT">이벤트</option>
                </select>
              </div>
              <div className="ap-form-group" style={{ flex: 1 }}>
                <label>제목</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
            </div>
            <div className="ap-form-group">
              <label>내용</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="공지사항 내용을 입력하세요"
                rows={6}
              />
            </div>
            <div className="ap-form-actions">
              <button className="ap-btn-cancel" onClick={() => setShowForm(false)}>취소</button>
              <button className="ap-btn-submit" onClick={handleCreateNotice} disabled={formLoading}>
                {formLoading ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>
        )}

        {/* ── 공지사항 목록 ── */}
        {tab === 'notices' && !loading && (
          <div className="ap-table-card">
            {notices.length === 0 ? (
              <div className="ap-empty">등록된 공지사항이 없습니다.</div>
            ) : (
              <table className="ap-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>번호</th>
                    <th style={{ width: 80 }}>카테고리</th>
                    <th>제목</th>
                    <th style={{ width: 120 }}>등록일</th>
                    <th style={{ width: 80 }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((n, i) => {
                    const b = BADGE[n.category] || BADGE.NOTICE;
                    return (
                      <tr key={n.id}>
                        <td className="ap-td-num">{notices.length - i}</td>
                        <td>
                          <span className={`ap-badge ${b.cls}`}>{b.label}</span>
                        </td>
                        <td className="ap-td-title">{n.title}</td>
                        <td className="ap-td-date">{n.createdAt?.slice(0, 10)}</td>
                        <td>
                          <button
                            className="ap-btn-delete"
                            onClick={() => handleDeleteNotice(n.id)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── 상담 신청 목록 ── */}
        {tab === 'contacts' && !loading && (
          <div className="ap-table-card">
            {contacts.length === 0 ? (
              <div className="ap-empty">접수된 상담 신청이 없습니다.</div>
            ) : (
              <table className="ap-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>번호</th>
                    <th style={{ width: 90 }}>이름</th>
                    <th style={{ width: 140 }}>연락처</th>
                    <th>상담 유형</th>
                    <th style={{ width: 120 }}>신청일</th>
                    <th style={{ width: 70 }}>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={c.id}>
                      <td className="ap-td-num">{contacts.length - i}</td>
                      <td className="ap-td-name">{c.name}</td>
                      <td className="ap-td-phone">{c.phone}</td>
                      <td className="ap-td-type">{c.type || '—'}</td>
                      <td className="ap-td-date">{c.createdAt?.slice(0, 10)}</td>
                      <td>
                        <button
                          className="ap-btn-view"
                          onClick={() => setSelectedContact(c)}
                        >
                          보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {/* ── 비공개 문의 목록 ── */}
        {tab === 'board' && !loading && (
          <div className="ap-table-card">
            {board.length === 0 ? (
              <div className="ap-empty">접수된 비공개 문의가 없습니다.</div>
            ) : (
              <table className="ap-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>번호</th>
                    <th style={{ width: 90 }}>이름</th>
                    <th>제목</th>
                    <th style={{ width: 120 }}>날짜</th>
                    <th style={{ width: 100 }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {board.map((b, i) => (
                    <tr key={b.id}>
                      <td className="ap-td-num">{board.length - i}</td>
                      <td className="ap-td-name">{b.name}</td>
                      <td className="ap-td-title">{b.title}</td>
                      <td className="ap-td-date">{b.createdAt?.slice(0, 10)}</td>
                      <td>
                        <button
                          className="ap-btn-view"
                          onClick={() => setSelectedContact({ ...b, _isBoard: true })}
                        >
                          보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* ── 문의 상세 모달 ── */}
      {selectedContact && (
        <div className="ap-modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ap-modal-close" onClick={() => setSelectedContact(null)}>×</button>
            <h2 className="ap-modal-title">상담 신청 상세</h2>
            <div className="ap-detail-grid">
              <div className="ap-detail-item">
                <span className="ap-detail-label">이름</span>
                <span className="ap-detail-value">{selectedContact.name}</span>
              </div>
              <div className="ap-detail-item">
                <span className="ap-detail-label">연락처</span>
                <span className="ap-detail-value">{selectedContact.phone}</span>
              </div>
              <div className="ap-detail-item">
                <span className="ap-detail-label">상담 유형</span>
                <span className="ap-detail-value">{selectedContact.type || '—'}</span>
              </div>
              <div className="ap-detail-item">
                <span className="ap-detail-label">신청일</span>
                <span className="ap-detail-value">{selectedContact.createdAt?.slice(0, 10)}</span>
              </div>
            </div>
            {selectedContact.message && (
              <div className="ap-detail-message">
                <span className="ap-detail-label">{selectedContact._isBoard ? '문의 내용' : '상담 내용'}</span>
                <p>{selectedContact.message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Toast msg={toast} />
    </div>
  );
}

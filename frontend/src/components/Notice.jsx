import React, { useEffect, useState } from 'react';
import { getNotices, deleteNotice } from '../api';
import './Notice.css';

const BADGE = {
  NOTICE: { label: '공지', cls: 'badge-notice' },
  INFO:   { label: '안내', cls: 'badge-info' },
  EVENT:  { label: '이벤트', cls: 'badge-event' },
};

export default function Notice({ isAdmin, onOpenWrite }) {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const res = await getNotices();
      setNotices(res.data);
    } catch {
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('공지사항을 삭제하시겠습니까?')) return;
    try {
      await deleteNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <section id="notice" className="notice-section">
      <div className="notice-header">
        <div>
          <div className="section-label">공지사항</div>
          <h2 className="section-title">새로운 소식</h2>
        </div>
        {isAdmin && (
          <button className="btn-write" onClick={onOpenWrite}>+ 공지 작성</button>
        )}
      </div>

      <div className="notice-list">
        {loading && <div className="empty-notice">불러오는 중...</div>}
        {!loading && notices.length === 0 && (
          <div className="empty-notice">등록된 공지사항이 없습니다.</div>
        )}
        {notices.map((n) => {
          const b = BADGE[n.category] || BADGE.NOTICE;
          return (
            <div className="notice-item" key={n.id} onClick={() => setSelected(n)}>
              <span className={`notice-badge ${b.cls}`}>{b.label}</span>
              <span className="notice-title">{n.title}</span>
              <span className="notice-date">{n.createdAt?.slice(0, 10)}</span>
              {isAdmin && (
                <button className="btn-delete" onClick={(e) => handleDelete(e, n.id)}>삭제</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="notice-detail">
              <div className="notice-detail-header">
                <span className={`notice-badge ${(BADGE[selected.category] || BADGE.NOTICE).cls}`} style={{ display: 'inline-block', marginBottom: 12 }}>
                  {(BADGE[selected.category] || BADGE.NOTICE).label}
                </span>
                <h3>{selected.title}</h3>
                <div className="notice-detail-meta">{selected.createdAt?.slice(0, 10)}</div>
              </div>
              <div className="notice-detail-body">{selected.content}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

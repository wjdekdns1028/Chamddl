import React, { useState } from 'react';
import { createNotice } from '../api';
import './Modal.css';

export default function WriteModal({ onClose, onCreated, onToast }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'NOTICE' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title) { onToast('제목을 입력해주세요.'); return; }
    if (!form.content) { onToast('내용을 입력해주세요.'); return; }
    setLoading(true);
    try {
      const res = await createNotice(form);
      onCreated(res.data);
      onClose();
      onToast('✅ 공지사항이 등록되었습니다.');
    } catch {
      onToast('등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>공지사항 작성</h2>
        <p className="modal-subtitle">새로운 공지사항을 작성합니다.</p>
        <div className="form-group">
          <label>카테고리</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="NOTICE">공지</option>
            <option value="INFO">안내</option>
            <option value="EVENT">이벤트</option>
          </select>
        </div>
        <div className="form-group">
          <label>제목</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="공지사항 제목을 입력하세요" />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            name="content" value={form.content} onChange={handleChange}
            placeholder="공지사항 내용을 입력하세요"
            style={{ height: 160 }}
          />
        </div>
        <button className="form-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  );
}

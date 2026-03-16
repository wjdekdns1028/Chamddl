import React, { useState } from 'react';
import { submitContact } from '../api';
import './Contact.css';

export default function Contact({ onToast }) {
  const [form, setForm] = useState({ name: '', phone: '', type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { onToast('이름과 연락처를 입력해주세요.'); return; }
    setSubmitting(true);
    try {
      await submitContact(form);
      onToast('✅ 상담 신청이 접수되었습니다. 빠른 시일 내 연락드리겠습니다.');
      setForm({ name: '', phone: '', type: '', message: '' });
    } catch {
      onToast('신청 중 오류가 발생했습니다. 전화로 문의해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid">
        <div>
          <div className="section-label">문의 / 예약</div>
          <h2 className="section-title">언제든지<br />연락주세요</h2>
          <p className="section-desc">전화, 문자, 홈페이지 문의 모두 가능합니다. 첫 상담은 망설이지 않으셔도 됩니다.</p>
          <div className="contact-info-list">
            {[
              { icon: '📞', label: '전화 문의', value: '02-1234-5678' },
              { icon: '🕐', label: '운영 시간', value: '월–금 10:00–20:00 / 토 10:00–16:00' },
              { icon: '📍', label: '위치', value: '서울특별시 마포구 어딘가로 123' },
              { icon: '💌', label: '이메일', value: 'hello@chamddeur.kr' },
            ].map((item) => (
              <div className="contact-info-item" key={item.label}>
                <div className="info-icon">{item.icon}</div>
                <div className="info-text">
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form">
          <h3>온라인 상담 신청</h3>
          <div className="form-group">
            <label>이름</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="홍길동" />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" />
          </div>
          <div className="form-group">
            <label>상담 유형</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">선택해주세요</option>
              <option>개인 심리상담</option>
              <option>커플 & 부부 상담</option>
              <option>가족 상담</option>
              <option>아동 & 청소년 상담</option>
              <option>심리검사</option>
              <option>스트레스 & 번아웃 상담</option>
            </select>
          </div>
          <div className="form-group">
            <label>상담 내용 (선택)</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="편하게 적어주세요." />
          </div>
          <button className="form-submit" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '전송 중...' : '신청하기'}
          </button>
        </div>
      </div>
    </section>
  );
}

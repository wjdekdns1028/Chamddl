import React from 'react';
import './Process.css';

const STEPS = [
  { num: '01', title: '상담 신청', desc: '전화, 문자, 홈페이지를 통해 편하게 첫 상담을 신청해주세요.' },
  { num: '02', title: '일정 조율', desc: '상담사와 일정을 확인하고 방문 또는 화상 상담을 예약합니다.' },
  { num: '03', title: '초기 면접', desc: '첫 만남에서 어려움을 충분히 나누고 상담 방향을 함께 정합니다.' },
  { num: '04', title: '상담 진행', desc: '합의된 목표를 향해 꾸준히 상담을 진행하며 변화를 만들어갑니다.' },
];

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="process-header">
        <div className="section-label" style={{ color: 'var(--sage-light)' }}>상담 절차</div>
        <h2 className="section-title" style={{ color: 'white' }}>상담은 이렇게 진행됩니다</h2>
        <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
          처음이라 망설여지신다면, 한 걸음씩 함께하겠습니다.
        </p>
      </div>
      <div className="process-steps">
        {STEPS.map((s) => (
          <div className="process-step" key={s.num}>
            <div className="step-num">{s.num}</div>
            <div className="step-line" />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

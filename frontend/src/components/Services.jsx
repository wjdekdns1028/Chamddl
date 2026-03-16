import React from 'react';
import './Services.css';

const SERVICES = [
  { icon: '💬', title: '개인 심리상담', desc: '우울, 불안, 자존감, 대인관계, 트라우마 등 개인의 심리적 어려움을 1:1로 깊이 있게 다룹니다.', tag: '50분 / 회기' },
  { icon: '👫', title: '커플 & 부부 상담', desc: '갈등, 소통 문제, 관계 회복을 위해 두 사람이 함께 더 나은 관계를 만들어갑니다.', tag: '80분 / 회기' },
  { icon: '👨‍👩‍👧', title: '가족 상담', desc: '가족 간 갈등과 소통 단절을 해소하고, 건강한 가족 관계를 위한 변화를 함께 만듭니다.', tag: '90분 / 회기' },
  { icon: '🧒', title: '아동 & 청소년 상담', desc: '학교 적응, 또래 관계, 학습 문제, 감정 조절 등 성장 과정의 어려움을 전문적으로 지원합니다.', tag: '40분 / 회기' },
  { icon: '🧪', title: '심리검사 & 해석', desc: 'MBTI, MMPI, 애착유형, 성격검사 등 다양한 심리검사를 통해 나를 더 잘 이해합니다.', tag: '60분 / 검사' },
  { icon: '🌿', title: '스트레스 & 번아웃 상담', desc: '직장, 육아, 학업에서 오는 만성 스트레스와 번아웃 회복을 위한 전문 프로그램입니다.', tag: '50분 / 회기' },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <div className="section-label">상담 프로그램</div>
        <h2 className="section-title">당신을 위한 프로그램</h2>
      </div>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

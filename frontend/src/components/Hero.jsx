import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-circle hbc1" />
      <div className="hero-bg-circle hbc2" />

      <div className="hero-content">
        <div className="hero-badge">참뜰 심리상담소</div>
        <h1 className="hero-title">
          마음이 쉬어가는<br /><em>따뜻한 뜰</em>처럼
        </h1>
        <p className="hero-desc">
          참뜰 심리상담소는 당신의 이야기를 온전히 들어드립니다.<br />
          혼자 감당해온 마음의 무게를, 이제 함께 나눠보세요.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>상담 예약하기</button>
          <button className="btn-secondary" onClick={() => scrollTo('services')}>프로그램 보기</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card">
          <div className="hero-card-icon">🌿</div>
          <h3>안전하고 따뜻한 공간</h3>
          <p>비밀이 보장되는 환경 속에서 편안하게 이야기 나눌 수 있습니다.</p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">1,200+</div>
              <div className="stat-label">상담 건수</div>
            </div>
            <div className="stat">
              <div className="stat-num">98%</div>
              <div className="stat-label">만족도</div>
            </div>
            <div className="stat">
              <div className="stat-num">10+</div>
              <div className="stat-label">운영 연수</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

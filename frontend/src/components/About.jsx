import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        <div className="about-visual">
          <div className="about-img-frame">🌱</div>
          <div className="about-tag">
            <p>전문 상담사</p>
            <strong>국가공인 자격증 보유</strong>
          </div>
        </div>
        <div className="about-text">
          <div className="section-label">상담소 소개</div>
          <h2 className="section-title">진심을 다해<br />함께하겠습니다</h2>
          <p className="section-desc">
            참뜰 심리상담소는 '참된 뜰'이라는 이름처럼, 진실하고 따뜻한 마음으로
            내담자 한 분 한 분과 함께합니다. 빠르게 변하는 세상 속에서 지친 마음을
            어루만지고, 자신을 더 깊이 이해할 수 있도록 돕겠습니다.
          </p>
          <div className="values-list">
            {[
              { icon: '🤝', title: '진정성 있는 관계', desc: '판단 없이 있는 그대로의 당신을 받아들입니다.' },
              { icon: '🔒', title: '철저한 비밀 보장', desc: '상담 내용은 법적 기준에 따라 철저히 보호됩니다.' },
              { icon: '🎯', title: '맞춤형 접근', desc: '획일적인 방법이 아닌 개인에게 맞는 상담을 제공합니다.' },
            ].map((v) => (
              <div className="value-item" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <div className="value-text">
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

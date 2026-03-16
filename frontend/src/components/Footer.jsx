import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">참<span>뜰</span> 심리상담소</div>
          <p className="footer-desc">
            마음이 쉬어가는 따뜻한 공간.<br />
            참뜰 심리상담소는 언제나 당신의 편입니다.
          </p>
        </div>
        <div className="footer-col">
          <h4>바로가기</h4>
          <ul>
            {[
              ['about', '상담소 소개'],
              ['services', '상담 프로그램'],
              ['process', '상담 절차'],
              ['notice', '공지사항'],
              ['contact', '문의 / 예약'],
            ].map(([id, label]) => (
              <li key={id} onClick={() => scrollTo(id)}>{label}</li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>운영 정보</h4>
          <ul>
            <li>월–금: 10:00 – 20:00</li>
            <li>토: 10:00 – 16:00</li>
            <li>일·공휴일: 휴무</li>
            <li style={{ marginTop: 12 }}>02-1234-5678</li>
            <li>hello@chamddeur.kr</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 참뜰 심리상담소. All rights reserved.</span>
        <span>제작 정다운</span>
      </div>
    </footer>
  );
}

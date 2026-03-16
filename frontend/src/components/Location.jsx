import React from 'react';
import './Location.css';

export default function Location() {
  return (
    <section id="location" className="location-section">
      <div className="location-inner">
        <div className="section-label">오시는 길</div>
        <h2 className="section-title">찾아오시는 방법</h2>
        <p className="section-desc">대중교통 또는 자가용으로 편리하게 방문하실 수 있습니다.</p>

        <div className="location-grid">
          <div className="location-map">
            <div className="map-placeholder">
              <span className="map-pin">📍</span>
              <p>서울특별시 마포구 어딘가로 123</p>
              <span className="map-hint">지도 영역</span>
            </div>
          </div>

          <div className="location-info">
            <div className="location-address">
              <span className="loc-icon">🏢</span>
              <div>
                <h4>주소</h4>
                <p>서울특별시 마포구 어딘가로 123<br />참뜰빌딩 3층</p>
              </div>
            </div>

            <div className="location-transport-list">
              <div className="transport-item">
                <div className="transport-badge subway">지하철</div>
                <div>
                  <strong>2호선 홍대입구역</strong> 3번 출구 도보 5분<br />
                  <strong>공항철도 홍대입구역</strong> 6번 출구 도보 7분
                </div>
              </div>
              <div className="transport-item">
                <div className="transport-badge bus">버스</div>
                <div>
                  <strong>간선버스</strong> 273, 471, 571<br />
                  <strong>지선버스</strong> 7011, 7013A
                </div>
              </div>
              <div className="transport-item">
                <div className="transport-badge car">주차</div>
                <div>
                  건물 내 주차 가능 (1시간 무료)<br />
                  인근 공영주차장 이용 가능
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

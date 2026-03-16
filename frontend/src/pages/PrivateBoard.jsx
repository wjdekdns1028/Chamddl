import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardList, createBoardPost, verifyBoardPost } from '../api';
import { useAdmin } from '../hooks/useAdmin';
import Navbar from '../components/Navbar';
import './PrivateBoard.css';

export default function PrivateBoard() {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 글쓰기 모달
  const [showWrite, setShowWrite] = useState(false);
  const [writeForm, setWriteForm] = useState({ title: '', name: '', password: '', content: '' });
  const [writeLoading, setWriteLoading] = useState(false);
  const [writeError, setWriteError] = useState('');

  // 조회 모달
  const [viewTarget, setViewTarget] = useState(null);
  const [viewPw, setViewPw] = useState('');
  const [viewResult, setViewResult] = useState(null);
  const [viewError, setViewError] = useState('');
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    getBoardList()
      .then((res) => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleWrite = async () => {
    if (!writeForm.title.trim()) { setWriteError('제목을 입력해주세요.'); return; }
    if (!writeForm.name.trim())  { setWriteError('이름을 입력해주세요.'); return; }
    if (!writeForm.password.trim()) { setWriteError('비밀번호를 입력해주세요.'); return; }
    setWriteLoading(true); setWriteError('');
    try {
      await createBoardPost(writeForm);
      const res = await getBoardList();
      setPosts(res.data);
      setShowWrite(false);
      setWriteForm({ title: '', name: '', password: '', content: '' });
    } catch {
      setWriteError('등록 중 오류가 발생했습니다.');
    } finally {
      setWriteLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!viewPw.trim()) { setViewError('비밀번호를 입력해주세요.'); return; }
    setViewLoading(true); setViewError('');
    try {
      const res = await verifyBoardPost(viewTarget.id, viewPw);
      setViewResult(res.data);
    } catch {
      setViewError('비밀번호가 올바르지 않습니다.');
    } finally {
      setViewLoading(false);
    }
  };

  const openView = (post) => {
    setViewTarget(post);
    setViewPw('');
    setViewResult(null);
    setViewError('');
  };

  const closeView = () => {
    setViewTarget(null);
    setViewResult(null);
    setViewPw('');
    setViewError('');
  };

  return (
    <div className="pb-page">
      <Navbar isAdmin={isAdmin} />
      <div className="pb-wrap">
        <div className="pb-header">
          <div>
            <div className="section-label">비공개</div>
            <h2 className="section-title">비공개 문의 게시판</h2>
            <p className="section-desc">작성 시 설정한 비밀번호로만 내용을 확인할 수 있습니다.</p>
          </div>
          <button className="pb-write-btn" onClick={() => { setShowWrite(true); setWriteError(''); }}>
            + 문의 글쓰기
          </button>
        </div>

        {loading ? (
          <div className="pb-loading">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="pb-empty">등록된 문의가 없습니다.</div>
        ) : (
          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>번호</th>
                  <th>제목</th>
                  <th style={{ width: 100 }}>작성자</th>
                  <th style={{ width: 120 }}>날짜</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p, i) => (
                  <tr key={p.id} onClick={() => openView(p)} className="pb-row">
                    <td className="pb-td-num">{posts.length - i}</td>
                    <td className="pb-td-title">
                      <span className="pb-lock">🔒</span> {p.title}
                    </td>
                    <td className="pb-td-name">{p.name}</td>
                    <td className="pb-td-date">{p.createdAt?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 글쓰기 모달 */}
      {showWrite && (
        <div className="pb-overlay" onClick={() => setShowWrite(false)}>
          <div className="pb-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pb-modal-close" onClick={() => setShowWrite(false)}>×</button>
            <h3 className="pb-modal-title">비공개 문의 작성</h3>
            <div className="pb-form-group">
              <label>제목</label>
              <input
                value={writeForm.title}
                onChange={(e) => setWriteForm({ ...writeForm, title: e.target.value })}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="pb-form-row">
              <div className="pb-form-group">
                <label>이름</label>
                <input
                  value={writeForm.name}
                  onChange={(e) => setWriteForm({ ...writeForm, name: e.target.value })}
                  placeholder="홍길동"
                />
              </div>
              <div className="pb-form-group">
                <label>비밀번호</label>
                <input
                  type="password"
                  value={writeForm.password}
                  onChange={(e) => setWriteForm({ ...writeForm, password: e.target.value })}
                  placeholder="나중에 조회 시 필요합니다"
                />
              </div>
            </div>
            <div className="pb-form-group">
              <label>내용</label>
              <textarea
                value={writeForm.content}
                onChange={(e) => setWriteForm({ ...writeForm, content: e.target.value })}
                placeholder="문의 내용을 자유롭게 적어주세요."
                rows={5}
              />
            </div>
            {writeError && <p className="pb-error">{writeError}</p>}
            <div className="pb-modal-actions">
              <button className="pb-btn-cancel" onClick={() => setShowWrite(false)}>취소</button>
              <button className="pb-btn-submit" onClick={handleWrite} disabled={writeLoading}>
                {writeLoading ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 조회 모달 */}
      {viewTarget && (
        <div className="pb-overlay" onClick={closeView}>
          <div className="pb-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pb-modal-close" onClick={closeView}>×</button>
            {viewResult ? (
              <>
                <h3 className="pb-modal-title">{viewResult.title}</h3>
                <div className="pb-view-meta">
                  <span>{viewResult.name}</span>
                  <span>{viewResult.createdAt?.slice(0, 10)}</span>
                </div>
                <div className="pb-view-content">{viewResult.content || '(내용 없음)'}</div>
              </>
            ) : (
              <>
                <h3 className="pb-modal-title">🔒 {viewTarget.title}</h3>
                <p className="pb-modal-desc">비밀번호를 입력하면 내용을 확인할 수 있습니다.</p>
                <div className="pb-form-group">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    value={viewPw}
                    onChange={(e) => setViewPw(e.target.value)}
                    placeholder="비밀번호 입력"
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    autoFocus
                  />
                </div>
                {viewError && <p className="pb-error">{viewError}</p>}
                <div className="pb-modal-actions">
                  <button className="pb-btn-cancel" onClick={closeView}>취소</button>
                  <button className="pb-btn-submit" onClick={handleVerify} disabled={viewLoading}>
                    {viewLoading ? '확인 중...' : '확인'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

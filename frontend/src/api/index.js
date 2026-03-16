import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('chamddeur-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── AUTH ── */
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

/* ── NOTICES ── */
export const getNotices = () => api.get('/notices');
export const createNotice = (data) => api.post('/notices', data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);

/* ── CONTACT ── */
export const submitContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');

/* ── PRIVATE BOARD ── */
export const getBoardList = () => api.get('/board');
export const createBoardPost = (data) => api.post('/board', data);
export const verifyBoardPost = (id, password) => api.post(`/board/${id}/verify`, { password });
export const getAdminBoard = () => api.get('/board/admin');
export const deleteBoardPost = (id) => api.delete(`/board/${id}`);

export default api;

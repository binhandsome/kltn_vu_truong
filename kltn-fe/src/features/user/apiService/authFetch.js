import { refreshToken, logout } from './authService';

/**
 * authFetch(url, options)
 *  – tự gắn Authorization
 *  – tự refresh 1 lần khi 401
 */
export const authFetch = async (url, options = {}) => {
  const run = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No access token');

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  let res = await run();

  // access-token hết hạn
  if (res.status === 401) {
    try {
      await refreshToken();      // chỉ thử 1 lần
      res = await run();         // gọi lại
    } catch (e) {
      logout();
      window.location.href = '/user/auth/login';
      throw e;
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res;
};

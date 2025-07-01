import { authFetch } from './authFetch';

const API_URL = 'http://localhost:8080/api/auth';
const API_EMAIL_URL = 'http://localhost:8080/api/email';

export const register = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  return await response.json(); // ✅ vì BE trả chuỗi
};

export const sendOtpToEmail = async (email) => {
  const res = await fetch(`${API_URL}/sendEmailRegister`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể gửi OTP');
  }

  return await res.text();
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken');
};

const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const logout = async () => {
  try {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');

    window.dispatchEvent(new Event('loggedOut'));
  } catch (error) {
    console.error('Lỗi khi logout:', error);
  }
};


export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(credentials),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed');
  }

  const data = await res.json();
  saveTokens(data);
  localStorage.setItem('username', data.username);
  window.dispatchEvent(new Event('tokenRefreshed'));
  return data;
};

let refreshPromise = null;

export const refreshToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const username     = localStorage.getItem('username');
      if (!refreshToken || !username) throw new Error('No refresh-token');

      const res = await fetch(`${API_URL}/refresh-token`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ username, refreshToken }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Refresh failed');
      }

      const data = await res.json();
      saveTokens(data);
      window.dispatchEvent(new Event('tokenRefreshed'));
      return data;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const requestOtpResetPassword = async (email) => {
  const res = await fetch(`${API_EMAIL_URL}/sendOtpResetPassword`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể gửi mã OTP');
  }

  return await res.text();
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ email, otp, newPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể đặt lại mật khẩu');
  }

  return await res.text();
};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await authFetch(`${API_URL}/change-password`, {
    method: 'PUT',
    body: JSON.stringify({
      currentPassword: oldPassword,
      newPassword: newPassword,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Đổi mật khẩu thất bại');
  }

  return await res.text();
};

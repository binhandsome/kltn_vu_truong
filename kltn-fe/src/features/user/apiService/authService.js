const API_URL = 'http://localhost:8081/api/auth';
const API_EMAIL_URL = 'http://localhost:8082/api/email';

export const register = async (user) => {
  console.log('[register] Attempting to register user:', user);
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    console.log('[register] Received response with status:', response.status);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('[register] Error response:', errorResponse);
      throw new Error(errorResponse.error || `Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log('[register] Registration successful:', data);
    return data;
  } catch (error) {
    console.error('[register] Network error:', { error: error.message });
    throw new Error('Network error');
  }
};

// ---- TIỆN ÍCH LƯU/XÓA TOKEN ----
const saveTokens = ({ accessToken, refreshToken }) => {
  console.log('[saveTokens] Saving tokens:', { accessToken, refreshToken });
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const logout = () => {
  console.log('[logout] Logging out user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  window.dispatchEvent(new Event('loggedOut'));
};

/* ------------------ AUTH ------------------ */
export const login = async (credentials) => {
  console.log('[login] Attempting to login with credentials:', credentials);
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  console.log('[login] Received response with status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[login] Login failed:', err);
    throw new Error(err.error || 'Login failed');
  }

  const data = await res.json();
  saveTokens(data);
  localStorage.setItem('username', data.username);
  console.log('[login] Login successful, saved tokens and username:', { data });
  window.dispatchEvent(new Event('tokenRefreshed'));
  return data;
};

let refreshPromise = null;
// authService.js
export const isAccessTokenExpired = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp < now; // true nếu đã hết hạn
  } catch (e) {
    console.error("❌ Không thể phân tích JWT:", e);
    return true;
  }
};

export const refreshToken = async () => {
  console.log('[refreshToken] Checking for existing refresh promise');
  if (refreshPromise) {
    console.log('[refreshToken] Using existing promise');
    return refreshPromise;
  }

  console.log('[refreshToken] Creating new refresh promise');
  refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const username = localStorage.getItem('username');
      console.log('[refreshToken] Retrieved tokens:', { refreshToken, username });
      if (!refreshToken || !username) {
        console.error('[refreshToken] No refresh token or username found');
        throw new Error('No refresh-token');
      }

      console.log('[refreshToken] Sending refresh request to:', `${API_URL}/refresh-token`);
      const res = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, refreshToken }),
      });

      console.log('[refreshToken] Received response with status:', res.status);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('[refreshToken] Refresh failed:', err);
        throw new Error(err.error || 'Refresh failed');
      }

      const data = await res.json();
      console.log('[refreshToken] Refresh successful, new tokens:', data);
      saveTokens(data);
      window.dispatchEvent(new Event('tokenRefreshed'));
      return data;
    } catch (error) {
      console.error('[refreshToken] Error during refresh:', { error: error.message, stack: error.stack });
      throw error;
    } finally {
      console.log('[refreshToken] Clearing refresh promise');
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/* ------------------ GỬI OTP RESET PASSWORD ------------------ */
export const requestOtpResetPassword = async (email) => {
  console.log('[requestOtpResetPassword] Sending OTP request for email:', email);
  try {
    const res = await fetch(`${API_EMAIL_URL}/sendOtpResetPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    console.log('[requestOtpResetPassword] Received response with status:', res.status);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[requestOtpResetPassword] Error response:', err);
      throw new Error(err.error || 'Không thể gửi mã OTP');
    }

    const data = await res.text();
    console.log('[requestOtpResetPassword] OTP sent successfully:', data);
    return data;
  } catch (error) {
    console.error('[requestOtpResetPassword] Network error:', { error: error.message });
    throw new Error(error.message || 'Lỗi mạng khi gửi OTP');
  }
};

/* ------------------ ĐẶT LẠI MẬT KHẨU ------------------ */
export const resetPassword = async ({ email, otp, newPassword }) => {
  console.log('[resetPassword] Attempting to reset password for email:', email);
  try {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    console.log('[resetPassword] Received response with status:', res.status);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[resetPassword] Error response:', err);
      throw new Error(err.error || 'Không thể đặt lại mật khẩu');
    }

    const data = await res.text();
    console.log('[resetPassword] Password reset successful:', data);
    return data;
  } catch (error) {
    console.error('[resetPassword] Network error:', { error: error.message });
    throw new Error(error.message || 'Lỗi mạng khi đặt lại mật khẩu');
  }
};

export const updateProfile = async (profileData) => {
  console.log('[updateProfile] Attempting to update profile:', profileData);
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  console.log('[updateProfile] Received response with status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[updateProfile] Error response:', err);
    throw new Error(err.error || 'Failed to update profile');
  }

  const data = await res.text();
  console.log('[updateProfile] Profile updated successfully:', data);
  return data;
};

export const getProfile = async () => {
  console.log('[getProfile] Fetching user profile');
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  console.log('[getProfile] Received response with status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[getProfile] Error response:', err);
    throw new Error(err.error || 'Failed to fetch user profile');
  }

  const data = await res.json();
  console.log('[getProfile] Profile fetched successfully:', data);
  return data;
};

/* ------------------ KIỂM TRA EMAIL CÓ TỒN TẠI ------------------ */
export const checkEmailExists = async (email) => {
  console.log('[checkEmailExists] Checking if email exists:', email);
  try {
    const res = await fetch(`${API_URL}/checkEmailExists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    console.log('[checkEmailExists] Received response with status:', res.status);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[checkEmailExists] Error response:', err);
      throw new Error(err.error || 'Không thể kiểm tra email');
    }

    const data = await res.json();
    console.log('[checkEmailExists] Email check result:', data);
    return data.exists;
  } catch (error) {
    console.error('[checkEmailExists] Network error:', { error: error.message });
    throw new Error(error.message || 'Lỗi mạng khi kiểm tra email');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  console.log('[changePassword] Attempting to change password');
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  console.log('[changePassword] Received response with status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[changePassword] Error response:', err);
    throw new Error(err.error || 'Không thể đổi mật khẩu');
  }

  const data = await res.text();
  console.log('[changePassword] Password changed successfully:', data);
  return data;
};
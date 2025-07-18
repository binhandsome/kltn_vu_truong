const API_URL = 'http://localhost:8081/api/auth';
const API_EMAIL_URL = 'http://localhost:8082/api/email';

export const register = async (user) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || `Request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error('Network error');
    }
};

// ---- TIỆN ÍCH LƯU/XÓA TOKEN ----
const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  window.dispatchEvent(new Event('loggedOut'));
};

/* ------------------ AUTH ------------------ */
export const login = async credentials => {
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
  if (refreshPromise) {
    return refreshPromise;
  }

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
/* ------------------ GỬI OTP RESET PASSWORD ------------------ */
export const requestOtpResetPassword = async (email) => {
  try {
    const res = await fetch(`${API_EMAIL_URL}/sendOtpResetPassword`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Không thể gửi mã OTP');
    }

    return await res.text(); // Trả về "OTP đã được gửi"
  } catch (error) {
    throw new Error(error.message || 'Lỗi mạng khi gửi OTP');
  }
};

/* ------------------ ĐẶT LẠI MẬT KHẨU ------------------ */
export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const res = await fetch(`${API_URL}/reset-password`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email, otp, newPassword }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Không thể đặt lại mật khẩu');
    }

    return await res.text(); // Trả về "Đặt lại mật khẩu thành công"
  } catch (error) {
    throw new Error(error.message || 'Lỗi mạng khi đặt lại mật khẩu');
  }
};
export const updateProfile = async (profileData) => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update profile');
  }

  return await res.text(); // Hoặc `await res.json()` nếu backend trả JSON
};
export const getProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch user profile');
  }

  return await res.json();
};

/* ------------------ KIỂM TRA EMAIL CÓ TỒN TẠI ------------------ */
export const checkEmailExists = async (email) => {
  try {
    const res = await fetch(`${API_URL}/checkEmailExists`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Không thể kiểm tra email');
    }

    const data = await res.json(); // Trả về { exists: true | false }
    return data.exists;
  } catch (error) {
    throw new Error(error.message || 'Lỗi mạng khi kiểm tra email');
  }
};
export const changePassword = async (currentPassword, newPassword) => {
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

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể đổi mật khẩu');
  }

  return await res.text(); // "Đổi mật khẩu thành công"
};


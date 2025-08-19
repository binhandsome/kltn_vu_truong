import axios from 'axios';
import { getNavigator } from './navigation';
import { getApiMessage, getApiCode } from './error';

export const api = axios.create({
  baseURL: 'http://localhost:8765/api/seller', // chỉnh theo BE của bạn
});

// đính kèm token tự động
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const code = getApiCode(err);

    if (status === 423) {
      const nav = getNavigator();
      const path = window.location.pathname;
      const state = { code, message: getApiMessage(err) };
      console.log('🔥 423 caught by interceptor', { path, code, state, hasNav: !!nav });

      if (!path.startsWith('/seller/notification/locked') &&
          !path.startsWith('/seller/notification/pending')) {
        if (code === 'SHOP_PENDING_REVIEW') {
          nav
            ? nav('/seller/notification/pending', { replace: true, state })
            : window.location.replace('/seller/notification/pending');
        } else {
          nav
            ? nav('/seller/notification/locked', { replace: true, state })
            : window.location.replace('/seller/notification/locked');
        }
      }
    }
    return Promise.reject(err);
  }
);


// tiện ích gọi API kiểu tuple
export async function apiCall(promise, fallbackMsg) {
  try {
    const { data } = await promise;
    return [data, null];
  } catch (err) {
    return [null, getApiMessage(err, fallbackMsg)];
  }
}

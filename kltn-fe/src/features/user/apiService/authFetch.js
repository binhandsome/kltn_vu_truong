import { refreshToken, logout } from './authService';

/**
 * authFetch(url, options)
 *  – tự gắn Authorization
 *  – tự refresh 1 lần khi 401
 */
export const authFetch = async (url, options = {}) => {
  console.log(`[authFetch] Initiating request to: ${url}`, { options });

  const run = async () => {
    console.log('[authFetch] Retrieving access token from localStorage:', localStorage.getItem('accessToken'));
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('[authFetch] No access token found');
      throw new Error('No access token');
    }
    console.log('[authFetch] Access token retrieved successfully:', token);

    console.log('[authFetch] Sending request with headers', {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    });
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`[authFetch] Response received with status: ${res.status}`);
    return res;
  };

  let res = await run();

  // Xử lý lỗi 401 (token hết hạn)
  if (res.status === 401) {
    console.warn('[authFetch] Received 401 Unauthorized, attempting to refresh token');
    try {
      console.log('[authFetch] Calling refreshToken');
      await refreshToken();
      console.log('[authFetch] Token refreshed successfully, re-running request');
      res = await run(); // Retry with updated token
    } catch (e) {
      console.error('[authFetch] Token refresh failed', { error: e.message, stack: e.stack });
      console.log('[authFetch] Logging out and redirecting to login');
      logout();
      window.location.href = '/user/auth/login';
      throw e;
    }
  }

  // Xử lý lỗi 403 (Forbidden)
  if (res.status === 403) {
    console.error('[authFetch] Received 403 Forbidden. User may lack required permissions.');
    let err;
    try {
      err = await res.json();
      console.error('[authFetch] Error response JSON:', err);
    } catch (jsonError) {
      console.error('[authFetch] Failed to parse error response as JSON', { error: jsonError.message });
      err = {};
    }
    throw new Error(err.error || 'You do not have permission to access this resource');
  }

  if (!res.ok) {
    console.error(`[authFetch] Request failed with status: ${res.status}`);
    let err;
    try {
      err = await res.json();
      console.error('[authFetch] Error response JSON:', err);
    } catch (jsonError) {
      console.error('[authFetch] Failed to parse error response as JSON', { error: jsonError.message });
      err = {};
    }
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  console.log('[authFetch] Request completed successfully');
  return res;
};
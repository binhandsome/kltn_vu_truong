import { useState, useEffect } from 'react';
import { refreshToken, isAccessTokenExpired  } from '../apiService/authService';

export const useAuthReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const expired = isAccessTokenExpired();
      if (expired) {
        try {
          await refreshToken(); // ⏳ chờ refresh
          console.log("✅ Token refreshed!");
        } catch (e) {
          console.warn("⚠️ Refresh token failed", e);
        }
      } else {
        console.log("✅ Token still valid");
      }

      setIsReady(true); // ✅ Cho phép App render
    };

    init();
  }, []);

  return isReady;
};

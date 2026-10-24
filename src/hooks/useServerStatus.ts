import { useState, useEffect, useCallback, useRef } from 'react';
import { SERVER_CONFIG } from '../config/serverConfig';
import { ServerStatus } from '../types';

export const useServerStatus = () => {
  const [status, setStatus] = useState<ServerStatus>({
    online: false,
    playersOnline: 0,
    playersMax: 100,
    version: '1.20 - 1.21.x',
    motd: 'CraftySMP Season 2 | Survival & Custom Weapons',
    hostname: SERVER_CONFIG.serverAddress,
    lastUpdated: '',
    loading: true,
    error: null,
    isUnavailable: false,
  });

  const isFetchingRef = useRef(false);

  const fetchStatus = useCallback(async (isManual = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (isManual) {
      setStatus((prev) => ({ ...prev, loading: true }));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(SERVER_CONFIG.statusApiUrl, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const isOnline = Boolean(data.online);
      const onlinePlayers = data.players?.online ?? 0;
      const maxPlayers = data.players?.max ?? 100;
      const serverVersion = data.version || '1.20 - 1.21.x';
      const motdClean = data.motd?.clean?.join(' ') || 'CraftySMP Season 2';

      setStatus({
        online: isOnline,
        playersOnline: onlinePlayers,
        playersMax: maxPlayers,
        version: serverVersion,
        motd: motdClean,
        hostname: data.hostname || SERVER_CONFIG.serverAddress,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        loading: false,
        error: null,
        isUnavailable: false,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const errorMsg = err instanceof Error ? err.message : 'Connection failed';
      // If API fails, display "Status unavailable" without inventing player counts
      setStatus((prev) => ({
        ...prev,
        loading: false,
        isUnavailable: true,
        error: errorMsg,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }));
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    let intervalId: NodeJS.Timeout;

    const startPolling = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!document.hidden) {
          fetchStatus();
        }
      }, SERVER_CONFIG.statusPollIntervalMs);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStatus();
        startPolling();
      } else {
        clearInterval(intervalId);
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchStatus]);

  return {
    status,
    refresh: () => fetchStatus(true),
  };
};

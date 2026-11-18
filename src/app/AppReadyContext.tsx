import React, { createContext, useContext, useState, useCallback } from 'react';

interface AppReadyContextValue {
  isReady: boolean;
  markReady: () => void;
}

const AppReadyContext = createContext<AppReadyContextValue>({
  isReady: false,
  markReady: () => {},
});

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('castaneda_preloaded') === '1';
    } catch {
      return false;
    }
  });

  const markReady = useCallback(() => {
    try {
      sessionStorage.setItem('castaneda_preloaded', '1');
    } catch {
      // Ignore storage access errors in private browsing
    }
    setIsReady(true);
  }, []);

  return (
    <AppReadyContext.Provider value={{ isReady, markReady }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  return useContext(AppReadyContext);
}

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const dashboardInitializedRef = useRef(false); // Track dashboard initialization globally

  const showGlobalLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message);
    setIsGlobalLoading(true);
  }, []);

  const hideGlobalLoading = useCallback(() => {
    setIsGlobalLoading(false);
  }, []);

  const isDashboardInitialized = useCallback(() => {
    return dashboardInitializedRef.current;
  }, []);

  const setDashboardInitialized = useCallback((value) => {
    dashboardInitializedRef.current = value;
  }, []);

  const resetDashboardInitialization = useCallback(() => {
    dashboardInitializedRef.current = false;
  }, []);

  const value = {
    isGlobalLoading,
    loadingMessage,
    showGlobalLoading,
    hideGlobalLoading,
    isDashboardInitialized,
    setDashboardInitialized,
    resetDashboardInitialization
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

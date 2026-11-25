import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Context remains responsible for user/session UI state and toast notifications.
// The movie watchlist is now managed separately by Redux Toolkit.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('flicksy-user') || 'null'); }
    catch { return null; }
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (user) localStorage.setItem('flicksy-user', JSON.stringify(user));
    else localStorage.removeItem('flicksy-user');
  }, [user]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message) => setToast(message), []);
  const value = useMemo(() => ({ user, setUser, toast, notify }), [user, toast, notify]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

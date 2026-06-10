import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('md_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  // Persist helper
  const persist = (token, userData) => {
    localStorage.setItem('md_token', token);
    localStorage.setItem('md_user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data.token, data.user);
    return data.user;
  };

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    persist(data.token, data.user);
    return data.user;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('md_token');
    localStorage.removeItem('md_user');
    setUser(null);
  }, []);

  // On mount: if a token exists, verify it / refresh user
  useEffect(() => {
    const token = localStorage.getItem('md_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('md_user', JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

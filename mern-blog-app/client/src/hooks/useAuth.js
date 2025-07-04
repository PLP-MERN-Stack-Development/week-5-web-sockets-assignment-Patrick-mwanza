import { useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const saveToken = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return { token, saveToken, logout };
};

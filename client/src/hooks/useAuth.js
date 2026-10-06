import { useMemo, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

async function requestAuth(path, body) {
  const response = await fetch(`${apiBaseUrl}/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Unable to authenticate. Please try again.');
  }

  return result;
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('agunity_user') || 'null');
  } catch {
    localStorage.removeItem('agunity_user');
    localStorage.removeItem('agunity_token');
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    signIn: async (email, password) => {
      setLoading(true);
      try {
        const result = await requestAuth('login', { email, password });
        localStorage.setItem('agunity_token', result.token);
        localStorage.setItem('agunity_user', JSON.stringify(result.user));
        setUser(result.user);
        return result;
      } finally {
        setLoading(false);
      }
    },
    signUp: async (payload) => {
      setLoading(true);
      try {
        const result = await requestAuth('register', payload);
        localStorage.setItem('agunity_token', result.token);
        localStorage.setItem('agunity_user', JSON.stringify(result.user));
        setUser(result.user);
        return result;
      } finally {
        setLoading(false);
      }
    },
    signOut: () => {
      localStorage.removeItem('agunity_token');
      localStorage.removeItem('agunity_user');
      setUser(null);
    }
  }), [user, loading]);

  return value;
}

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (phone, password) => {
    // Здесь потом будет запрос к серверу
    console.log('Login:', phone, password);
    // Имитация успешного входа
    setUser({ phone, name: 'Тестовый пользователь' });
    return { success: true };
  };

  const register = async (userData) => {
    // Здесь потом будет запрос к серверу
    console.log('Register:', userData);
    // Имитация успешной регистрации
    setUser({ phone: userData.phone, name: userData.name });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
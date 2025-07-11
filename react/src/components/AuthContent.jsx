import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage when the app loads
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userId && userName) {
      setUser({ id: userId, name: userName, email: userEmail });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userId', userData._id);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    setUser({ id: userData._id, name: userData.name, email: userData.email });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simulating a logged in Dispatcher assigned to "Sydney Central"
  const [user, setUser] = useState({
    name: 'Sarah Mitchell',
    role: 'dispatcher',
    branchId: 'SYD-CENTRAL',
    branchName: 'Sydney Central Depot',
    email: 'sarah.m@herologistics.com'
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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

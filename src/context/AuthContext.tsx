/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode, type FC } from 'react';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setIsAuthenticated(true);
    let role = 'Employee';
    const prefix = email.split('@')[0].toLowerCase();
    if (prefix === 'admin') role = 'Admin';
    if (prefix === 'manager') role = 'Manager';
    if (prefix === 'finance') role = 'Finance';
    if (prefix === 'vendor') role = 'Vendor';
    setUser({ email, role });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

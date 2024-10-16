'use client'

import { fetchUsers } from '@/services/userService';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (username: string, email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, email: string) => {
    try {
      const users: User[] = await fetchUsers();

      const user = users.find(user => user.username === username && user.email === email);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        return true; // Login successful
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    return false; // User not found
  };

  const logout = () => {
    setIsAuthenticated(false); // Clear authenticated state
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
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
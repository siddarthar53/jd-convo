import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'hr' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  reportsTo?: string; // Manager ID
  subordinates?: string[]; // Direct report IDs
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static credentials for demo
const DEMO_CREDENTIALS = {
  'hr@demo.com': {
    password: 'Hr@123',
    user: { 
      id: '1', 
      email: 'hr@demo.com', 
      name: 'Sarah Johnson', 
      role: 'hr' as UserRole 
    }
  },
  'manager@demo.com': {
    password: 'Mgr@123',
    user: { 
      id: '2', 
      email: 'manager@demo.com', 
      name: 'Michael Chen', 
      role: 'employee' as UserRole,
      subordinates: ['3', '4', '5'] as string[] // Has direct reports, so acts as manager
    }
  },
  'employee@demo.com': {
    password: 'Emp@123',
    user: { 
      id: '3', 
      email: 'employee@demo.com', 
      name: 'Alex Rivera', 
      role: 'employee' as UserRole,
      reportsTo: '2' // Reports to Michael
    }
  },
  'peer@demo.com': {
    password: 'Peer@123',
    user: { 
      id: '4', 
      email: 'peer@demo.com', 
      name: 'Jamie Wilson', 
      role: 'employee' as UserRole,
      reportsTo: '2' // Reports to Michael
    }
  },
} as const;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('jd-platform-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('jd-platform-user');
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const credential = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS];
    
    if (credential && credential.password === password) {
      setUser(credential.user);
      localStorage.setItem('jd-platform-user', JSON.stringify(credential.user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jd-platform-user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";

type User = {
  id: string;
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem, removeItem } = useLocalStorage();
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = getItem("inkspireUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        removeItem("inkspireUser");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setItem("inkspireUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    removeItem("inkspireUser");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

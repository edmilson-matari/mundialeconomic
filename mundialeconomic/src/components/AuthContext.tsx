// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

import type { ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const logged = localStorage.getItem("admin-auth") === "true";
    setIsAdmin(logged);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@marketplace.com" && password === "admin123") {
          localStorage.setItem("admin-auth", "true");
          setIsAdmin(true);
          resolve();
        } else {
          reject(new Error("E-mail ou senha incorretos"));
        }
      }, 800);
    });
  };

  const loginWithGoogle = () => {
    alert(
      "Login com Google – configure com Firebase Auth ou seu backend OAuth"
    );
  };

  const logout = () => {
    localStorage.removeItem("admin-auth");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAdmin, login, loginWithGoogle, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

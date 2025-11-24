// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import supabase from "../supabase-client";
import bcrypt from "bcryptjs";

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem("admin-auth") === "true";
    setIsAdmin(logged);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (error || !admin) {
      throw new Error("Admin não encontrado");
    }

    const isPasswordValid = password === admin.password;
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    localStorage.setItem("admin-auth", "true");
    localStorage.setItem(
      "admin-data",
      JSON.stringify({ name: admin.name, email: admin.email })
    );
    setIsAdmin(true);
  };

  const loginWithGoogle = () => {
    alert("Login com Google OAuth em breve");
  };

  const logout = () => {
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-data");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAdmin, loading, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider");
  return context;
};

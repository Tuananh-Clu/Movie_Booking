import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phoneNumber?: string;
  password:string
};

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    avatar:string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsSignedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsSignedIn(false);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password}),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem("token", data.token);

    setUser(data.user);
    setIsSignedIn(true);
  };
  
  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatarUrl:string
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Auth/Register`,
        { email, password, name ,avatarUrl}, 
        {
          headers: { "Content-Type": "application/json" }, 
        }
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsSignedIn(true);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


export const useUser = () => {
  const { user, isSignedIn } = useAuth();
  return {
    user,
    isSignedIn,
    isLoaded: true, 
    isSignedUp: isSignedIn, 
  };
};

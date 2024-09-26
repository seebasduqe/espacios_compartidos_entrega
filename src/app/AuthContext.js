"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    try {
        const res = await axios.get("/api/auth/logout");
        router.push("/login");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } catch (error) {
        console.error(error.message);
      }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth () { return useContext(AuthContext); } 

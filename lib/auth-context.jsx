"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser, getUserById, addUser } from "./mock-service";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("madrasa_current_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (user) {
      localStorage.setItem("madrasa_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("madrasa_current_user");
    }
  }, [user, loaded]);

  const login = async (email, password) => {
    const u = await authenticateUser(email, password);
    if (!u) throw new Error("Invalid credentials");
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  const register = async (data) => {
    const newU = await addUser(data);
    const { password: _, ...rest } = newU;
    setUser(rest);
    return rest;
  };

  const reloadUser = async () => {
    if (!user?.id) return;
    const fresh = await getUserById(user.id);
    const { password: _, ...rest } = fresh || {};
    setUser(rest || null);
  };

  const value = { user, login, logout, register, reloadUser, loaded };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

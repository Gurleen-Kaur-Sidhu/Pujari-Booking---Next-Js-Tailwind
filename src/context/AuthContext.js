"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    const role = getCookie("role");

    setIsAuthenticated(!!token);
    setRole(role);

    if (token) {
      fetch("https://pujari-app-backend-production.up.railway.app/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then((res) => res.json())
        .then((data) => {
          if (role === "pujari") {
            setUser(data.pujariData || null);
          } else {
            setUser(data.userData || null);
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

 const login = async (token, userRole) => {
  document.cookie = `token=${token}; path=/; max-age=86400`;
  document.cookie = `role=${userRole}; path=/; max-age=86400`;

  setIsAuthenticated(true);
  setRole(userRole);

  try {
    const res = await fetch("https://pujari-app-backend-production.up.railway.app/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (userRole === "pujari") {
      setUser(data.pujariData || null);
    } else {
      setUser(data.userData || null);
    }

    return true; // ✅ Success
  } catch (err) {
    console.error("Login profile fetch failed:", err);
    setUser(null);
    return false; // ❌ Failure
  }
};


  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

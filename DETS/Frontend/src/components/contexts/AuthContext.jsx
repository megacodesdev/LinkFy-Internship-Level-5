import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // This request will automatically include cookies
        const res = await axios.get("http://localhost:5172/api/auth/verify", {
          withCredentials: true, // Important for cookies
        });

        setAuthState({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    verifyAuth();
  }, []);

  const updateAuth = (user, token) => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];

      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "http://localhost:5172/api/auth/login",
        credentials,
        { withCredentials: true } // Important for cookies
      );

      setAuthState({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return res.data;
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:5172/api/auth/register",
        userData
      );
      updateAuth(res.data.user, res.data.token);
      return res.data;
    } catch (error) {
      updateAuth(null, null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5172/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

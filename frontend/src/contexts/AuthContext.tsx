import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { User, Society, UserRole } from "@/types/auth";
import { loginApi } from "@/api/auth.api";
import { api } from "@/api/axios";

/* ================= TYPES ================= */
interface AuthContextType {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  login: (
    userId: string,
    password: string,
    role: UserRole
  ) => Promise<boolean>;

  logout: () => void;

  setSociety: (society: Society) => void;
  selectSociety: (society: Society) => void;
  clearSociety: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= PROVIDER ================= */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* 🔁 RESTORE SESSION */
  useEffect(() => {
    try {
      const token = sessionStorage.getItem("auth-token");
      const storedUser = sessionStorage.getItem("auth-user");
      const storedSociety = sessionStorage.getItem("auth-society");

      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedSociety) {
        setSelectedSociety(JSON.parse(storedSociety));
      }
    } catch (err) {
      console.error("Auth restore failed", err);
      sessionStorage.clear();
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /* ================= LOGIN ================= */
  const login = useCallback(
    async (
      userId: string,
      password: string,
      role: UserRole
    ): Promise<boolean> => {
      try {
        const res = await loginApi({ userId, password });
        const { token, user } = res.data;

        if (user.role !== role) return false;

        sessionStorage.setItem("auth-token", token);
        sessionStorage.setItem("auth-user", JSON.stringify(user));
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setUser(user);
        setSelectedSociety(null);
        sessionStorage.removeItem("auth-society");

        return true;
      } catch (err) {
        console.error("Login failed", err);
        return false;
      }
    },
    []
  );

  /* ================= LOGOUT ================= */
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSociety(null);
    sessionStorage.clear();
    delete api.defaults.headers.common.Authorization;
  }, []);

  /* ================= SOCIETY ================= */
  const selectSociety = useCallback((society: Society) => {
    setSelectedSociety(society);
    sessionStorage.setItem("auth-society", JSON.stringify(society));
  }, []);

  const setSociety = useCallback(
    (society: Society) => selectSociety(society),
    [selectSociety]
  );

  const clearSociety = useCallback(() => {
    setSelectedSociety(null);
    sessionStorage.removeItem("auth-society");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedSociety,
        isAuthenticated: Boolean(user),
        authLoading,
        login,
        logout,
        selectSociety,
        setSociety,
        clearSociety,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

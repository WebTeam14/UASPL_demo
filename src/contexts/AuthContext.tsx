import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { User, Society, UserRole } from "@/types/auth";

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
  selectSociety: (society: Society) => void;
  clearSociety: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= MOCK USERS ================= */
const mockUsers: Record<string, { password: string; user: User }> = {
  admin001: {
    password: "admin123",
    user: {
      id: "1",
      userId: "admin001",
      name: "Super Admin",
      email: "admin@uaspl.com",
      role: "admin",
      assignedSocieties: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23",
      ],
    },
  },

  proj001: {
    password: "proj123",
    user: {
      id: "2",
      userId: "proj001",
      name: "Project Admin",
      email: "projectadmin@uaspl.com",
      role: "project_admin",
      assignedSocieties: [
        "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15",
      ],
    },
  },

  eng001: {
    password: "eng123",
    user: {
      id: "3",
      userId: "eng001",
      name: "Engineer",
      email: "eng@uaspl.com",
      role: "engineer",
      assignedSocieties: ["1", "2", "3"],
    },
  },

  tmi001: {
    password: "tmi123",
    user: {
      id: "4",
      userId: "tmi001",
      name: "TMI Officer",
      email: "tmi@uaspl.com",
      role: "tmi",
      assignedSocieties: ["1", "2", "3"],
    },
  },

  ven001: {
    password: "ven123",
    user: {
      id: "5",
      userId: "ven001",
      name: "Vendor",
      email: "vendor@co.com",
      role: "vendor",
      assignedSocieties: ["1"],
    },
  },
};

/* ================= PROVIDER ================= */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* 🔐 RESTORE SESSION */
  useEffect(() => {
    const storedUser = sessionStorage.getItem("auth-user");
    const storedSociety = sessionStorage.getItem("auth-society");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }

    if (storedSociety) {
      try {
        setSelectedSociety(JSON.parse(storedSociety));
      } catch (e) {
        console.error("Failed to parse stored society", e);
      }
    }

    setAuthLoading(false);
  }, []);

  /* ================= LOGIN ================= */
  const login = useCallback(
    async (
      userId: string,
      password: string,
      role: UserRole
    ): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 400));

      const entry = mockUsers[userId];
      if (!entry) return false;
      if (entry.password !== password) return false;
      if (entry.user.role !== role) return false;

      setUser(entry.user);
      sessionStorage.setItem("auth-user", JSON.stringify(entry.user));

      setSelectedSociety(null);
      sessionStorage.removeItem("auth-society");

      return true;
    },
    []
  );

  /* ================= LOGOUT ================= */
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSociety(null);
    sessionStorage.clear();
  }, []);

  /* ================= SOCIETY ================= */
  const selectSociety = useCallback((society: Society) => {
    setSelectedSociety(society);
    sessionStorage.setItem("auth-society", JSON.stringify(society));
  }, []);

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

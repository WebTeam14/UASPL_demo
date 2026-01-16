<<<<<<< HEAD
import React, { createContext, useContext, useState, useCallback } from "react";
import { User, Society, UserRole } from "@/types/auth";

=======
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { User, Society, UserRole } from "@/types/auth";

/* ================= TYPES ================= */
>>>>>>> 89a3e2f (Updated UI and latest fixes)
interface AuthContextType {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
<<<<<<< HEAD
  login: (userId: string, password: string, role: UserRole) => Promise<boolean>;
=======
  authLoading: boolean; // ✅ IMPORTANT
  login: (
    userId: string,
    password: string,
    role: UserRole
  ) => Promise<boolean>;
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  logout: () => void;
  selectSociety: (society: Society) => void;
  clearSociety: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
// Mock users for demo
=======
/* ================= MOCK USERS ================= */
>>>>>>> 89a3e2f (Updated UI and latest fixes)
const mockUsers: Record<string, { password: string; user: User }> = {
  admin001: {
    password: "admin123",
    user: {
      id: "1",
      userId: "admin001",
<<<<<<< HEAD
      name: "UASPL",
      email: "rajesh.kumar@uaspl.com",
      role: "admin",
      assignedSocieties: ["1", "2", "3", "4", "5"],
    },
  },
  eng001: {
    password: "eng123",
    user: {
      id: "2",
      userId: "eng001",
      name: "Priya Sharma",
      email: "priya.sharma@uaspl.com",
      role: "engineer",
      assignedSocieties: ["1", "2"],
    },
  },
  ven001: {
    password: "ven123",
    user: {
      id: "3",
      userId: "vendor001",
      name: "Arjun Patel",
      email: "arjun@vendorco.com",
=======
      name: "Admin",
      email: "admin@uaspl.com",
      role: "admin",
      assignedSocieties: [
        "1","2","3","4","5","6","7","8","9","10",
        "11","12","13","14","15","16","17","18","19","20",
        "21","22","23",
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
      role: "project admin",
      assignedSocieties: ["1", "2", "3", "4", "5"],
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

  ven001: {
    password: "ven123",
    user: {
      id: "4",
      userId: "vendor001",
      name: "Vendor",
      email: "vendor@co.com",
>>>>>>> 89a3e2f (Updated UI and latest fixes)
      role: "vendor",
      assignedSocieties: ["1"],
    },
  },
<<<<<<< HEAD
  tmi001: {
    password: "tmi123",
    user: {
      id: "4",
      userId: "tmi001",
      name: "Sneha Verma",
      email: "sneha.verma@uaspl.com",
=======

  tmi001: {
    password: "tmi123",
    user: {
      id: "5",
      userId: "tmi001",
      name: "TMI Officer",
      email: "tmi@uaspl.com",
>>>>>>> 89a3e2f (Updated UI and latest fixes)
      role: "tmi",
      assignedSocieties: ["1", "2", "3"],
    },
  },
<<<<<<< HEAD
  fin001: {
    password: "fin123",
    user: {
      id: "5",
      userId: "finance001",
      name: "Amit Joshi",
      email: "amit.joshi@uaspl.com",
      role: "finance",
      assignedSocieties: ["1", "2", "3", "4", "5"],
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

=======
};

/* ================= PROVIDER ================= */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // ✅ IMPORTANT

  /* 🔐 RESTORE SESSION SAFELY */
  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    const storedSociety = localStorage.getItem("auth-society");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedSociety) {
      setSelectedSociety(JSON.parse(storedSociety));
    }

    setAuthLoading(false); // ✅ DONE LOADING
  }, []);

  /* ================= LOGIN ================= */
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  const login = useCallback(
    async (
      userId: string,
      password: string,
      role: UserRole
    ): Promise<boolean> => {
<<<<<<< HEAD
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser = mockUsers[userId];
      if (
        mockUser &&
        mockUser.password === password &&
        mockUser.user.role === role
      ) {
        setUser(mockUser.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
=======
      await new Promise((r) => setTimeout(r, 500));

      const entry = mockUsers[userId];

      if (!entry) return false;
      if (entry.password !== password) return false;
      if (entry.user.role !== role) return false;

      setUser(entry.user);
      localStorage.setItem("auth-user", JSON.stringify(entry.user));

      setSelectedSociety(null);
      localStorage.removeItem("auth-society");

      return true;
>>>>>>> 89a3e2f (Updated UI and latest fixes)
    },
    []
  );

<<<<<<< HEAD
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSociety(null);
    setIsAuthenticated(false);
  }, []);

  const selectSociety = useCallback((society: Society) => {
    setSelectedSociety(society);
=======
  /* ================= LOGOUT ================= */
  const logout = useCallback(() => {
    setUser(null);
    setSelectedSociety(null);
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-society");
  }, []);

  /* ================= SOCIETY ================= */
  const selectSociety = useCallback((society: Society) => {
    setSelectedSociety(society);
    localStorage.setItem("auth-society", JSON.stringify(society));
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  }, []);

  const clearSociety = useCallback(() => {
    setSelectedSociety(null);
<<<<<<< HEAD
=======
    localStorage.removeItem("auth-society");
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedSociety,
<<<<<<< HEAD
        isAuthenticated,
=======
        isAuthenticated: Boolean(user),
        authLoading, // ✅ EXPOSE
>>>>>>> 89a3e2f (Updated UI and latest fixes)
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

<<<<<<< HEAD
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
=======
/* ================= HOOK ================= */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  }
  return context;
}

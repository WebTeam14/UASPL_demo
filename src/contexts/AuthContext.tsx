import React, { createContext, useContext, useState, useCallback } from "react";
import { User, Society, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  selectSociety: (society: Society) => void;
  clearSociety: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  admin001: {
    password: "admin123",
    user: {
      id: "1",
      userId: "admin001",
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
      role: "vendor",
      assignedSocieties: ["1"],
    },
  },
  tmi001: {
    password: "tmi123",
    user: {
      id: "4",
      userId: "tmi001",
      name: "Sneha Verma",
      email: "sneha.verma@uaspl.com",
      role: "tmi",
      assignedSocieties: ["1", "2", "3"],
    },
  },
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

  const login = useCallback(
    async (
      userId: string,
      password: string,
      role: UserRole
    ): Promise<boolean> => {
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
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setSelectedSociety(null);
    setIsAuthenticated(false);
  }, []);

  const selectSociety = useCallback((society: Society) => {
    setSelectedSociety(society);
  }, []);

  const clearSociety = useCallback(() => {
    setSelectedSociety(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedSociety,
        isAuthenticated,
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

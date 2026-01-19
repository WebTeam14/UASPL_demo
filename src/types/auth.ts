export type UserRole =
  | "admin"
  | "project_admin"
  | "engineer"
  | "vendor"
  | "tmi";

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  assignedSocieties: string[];
}

export interface Society {
  id: string;
  name: string;
  code: string;
  address: string;
  status: "active" | "planning" | "completed";
  projectCount: number;
  memberCount: number;
  lastUpdated: string;
  website?: string;
}

export interface AuthState {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
}

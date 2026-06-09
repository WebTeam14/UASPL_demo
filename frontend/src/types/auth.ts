export type UserRole =
  | "admin"
  | "project_admin"
  | "engineer"
  | "vendor";

/* ================= USER ================= */
export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;

  /**
   * Society IDs are UUID strings
   */
  assignedSocieties: string[];
}

/* ================= SOCIETY ================= */
export interface Society {
  /**
   * UUID from backend / Prisma
   */
  id: string;
  name: string;
  code: string;
  address?: string;

  websiteUrl?: string | null;
}

/* ================= AUTH STATE ================= */
export interface AuthState {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
}

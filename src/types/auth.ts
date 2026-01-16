<<<<<<< HEAD
export type UserRole = 'admin' | 'engineer' | 'vendor' | 'tmi' | 'finance';
=======
export type UserRole = 'admin' | 'engineer' | 'vendor' | 'tmi' | 'project admin';
>>>>>>> 89a3e2f (Updated UI and latest fixes)

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
<<<<<<< HEAD
  status: 'active' | 'planning' | 'completed';
  projectCount: number;
  memberCount: number;
  lastUpdated: string;
}

=======
  status: "active" | "planning" | "completed";
  projectCount: number;
  memberCount: number;
  lastUpdated: string;
  website?: string; 
}


>>>>>>> 89a3e2f (Updated UI and latest fixes)
export interface AuthState {
  user: User | null;
  selectedSociety: Society | null;
  isAuthenticated: boolean;
}

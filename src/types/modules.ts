export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  allowedRoles: string[];
}

export interface Project {
  id: string;
  name: string;
  societyId: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  startDate: string;
  endDate?: string;
  progress: number;
  budget: number;
  spent: number;
}

export interface Drawing {
  id: string;
  name: string;
  projectId: string;
  version: number;
  status: 'draft' | 'pending-review' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  comments: DrawingComment[];
}

export interface DrawingComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  resolved: boolean;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minStock: number;
  location: string;
  lastUpdated: string;
}

export interface Inspection {
  id: string;
  projectId: string;
  type: string;
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'passed' | 'failed';
  inspector: string;
  notes?: string;
}

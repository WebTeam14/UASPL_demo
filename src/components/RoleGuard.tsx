import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/* ✅ Use the same role type as AuthContext */
type UserRole = string;

type Props = {
  roles: UserRole[];
  children: ReactNode;
};

export default function RoleGuard({ roles, children }: Props) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

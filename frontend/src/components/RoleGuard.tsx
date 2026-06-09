import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

type Props = {
  roles: UserRole[];
  children: ReactNode;
};

export default function RoleGuard({ roles, children }: Props) {
  const { user, authLoading } = useAuth();

  // ⏳ Wait until auth state is restored
  if (authLoading) {
    return null;
  }

  // 🔐 Not logged in or role not allowed
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  requireSociety?: boolean;
}

export default function ProtectedRoute({
  children,
  requireSociety = false,
}: Props) {
  const { isAuthenticated, selectedSociety, authLoading } = useAuth();

  /* ⏳ WAIT FOR AUTH + SOCIETY RESTORE */
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  /* 🔐 NOT LOGGED IN */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* 🏢 SOCIETY REQUIRED */
  if (requireSociety && !selectedSociety) {
    return <Navigate to="/select-society" replace />;
  }

  return <>{children}</>;
}

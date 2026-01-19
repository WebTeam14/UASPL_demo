import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: JSX.Element;
  requireSociety?: boolean;
}

export default function ProtectedRoute({
  children,
  requireSociety = false,
}: Props) {
  const { isAuthenticated, selectedSociety } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSociety && !selectedSociety) {
    return <Navigate to="/select-society" replace />;
  }

  return children;
}

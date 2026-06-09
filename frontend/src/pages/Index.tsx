import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, selectedSociety } = useAuth();

  if (isAuthenticated && selectedSociety) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/select-society" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Index;

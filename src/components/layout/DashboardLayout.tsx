<<<<<<< HEAD
import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { useAuth } from '@/contexts/AuthContext';
=======
import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useAuth } from "@/contexts/AuthContext";
>>>>>>> 89a3e2f (Updated UI and latest fixes)

export function DashboardLayout() {
  const { isAuthenticated, selectedSociety } = useAuth();

<<<<<<< HEAD
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

=======
  // 🔒 Auth guard
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🏢 Society guard
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  if (!selectedSociety) {
    return <Navigate to="/select-society" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
<<<<<<< HEAD
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />
=======

        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />

          {/* ✅ REQUIRED FOR NESTED ROUTES */}
>>>>>>> 89a3e2f (Updated UI and latest fixes)
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

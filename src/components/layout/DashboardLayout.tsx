import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardLayout() {
  const { isAuthenticated, selectedSociety } = useAuth();

  // 🔒 Auth guard
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🏢 Society guard
  if (!selectedSociety) {
    return <Navigate to="/select-society" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />

          {/* ✅ REQUIRED FOR NESTED ROUTES */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

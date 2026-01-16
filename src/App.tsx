import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectSociety from "./pages/SelectSociety";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Login from "./pages/Login";
import SelectSociety from "./pages/SelectSociety";

>>>>>>> 89a3e2f (Updated UI and latest fixes)
import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ArchitectureModule from "./pages/dashboard/ArchitectureModule";
import MaterialsModule from "./pages/dashboard/MaterialsModule";
import TMIModule from "./pages/dashboard/TMIModule";
import PlaceholderModule from "./pages/dashboard/PlaceholderModule";
<<<<<<< HEAD
=======

import CivilHome from "@/pages/dashboard/civil/CivilHome";
import RCCChecklist from "@/pages/dashboard/civil/RCCChecklist";
import RCCChecklistReview from "@/pages/dashboard/civil/RCCChecklistReview";

>>>>>>> 89a3e2f (Updated UI and latest fixes)
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

<<<<<<< HEAD
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select-society" element={<SelectSociety />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="compliance" element={<PlaceholderModule />} />
              <Route path="architecture" element={<ArchitectureModule />} />
              <Route path="civil" element={<PlaceholderModule />} />
              <Route path="mep" element={<PlaceholderModule />} />
              <Route path="meetings" element={<PlaceholderModule />} />
              <Route path="development" element={<PlaceholderModule />} />
              <Route path="materials" element={<MaterialsModule />} />
              <Route path="store" element={<PlaceholderModule />} />
              <Route path="tmi" element={<TMIModule />} />
              <Route path="finance" element={<PlaceholderModule />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
=======
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              {/* ROOT */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* PUBLIC */}
              <Route path="/login" element={<Login />} />

              {/* LOGIN REQUIRED */}
              <Route
                path="/select-society"
                element={
                  <ProtectedRoute>
                    <SelectSociety />
                  </ProtectedRoute>
                }
              />

              {/* DASHBOARD */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireSociety>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />

                <Route path="architecture" element={<ArchitectureModule />} />
                <Route path="materials" element={<MaterialsModule />} />

                {/* CIVIL */}
                <Route path="civil">
                  <Route index element={<CivilHome />} />
                  <Route path="rcc-checklist" element={<RCCChecklist />} />
                  <Route path="rcc-review" element={<RCCChecklistReview />} />
                </Route>

                <Route path="tmi" element={<TMIModule />} />
                <Route path="finance" element={<PlaceholderModule />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
>>>>>>> 89a3e2f (Updated UI and latest fixes)

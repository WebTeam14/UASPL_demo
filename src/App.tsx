import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";

import Login from "./pages/Login";
import SelectSociety from "./pages/SelectSociety";

import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ArchitectureModule from "./pages/dashboard/ArchitectureModule";
import MaterialsModule from "./pages/dashboard/MaterialsModule";
import TMIModule from "./pages/dashboard/TMIModule";
import PlaceholderModule from "./pages/dashboard/PlaceholderModule";
import ComplianceDashboard from "./pages/dashboard/compliance/ComplianceDashboard";

import CivilHome from "./pages/dashboard/civil/CivilHome";
import RCCChecklist from "./pages/dashboard/civil/RCCChecklist";
import RCCChecklistReview from "./pages/dashboard/civil/RCCChecklistReview";
import BlockWorkChecklist from "./pages/dashboard/civil/BlockWorkChecklist";
import BlockWorkChecklistReview from "./pages/dashboard/civil/BlockWorkChecklistReview";

import NotFound from "./pages/NotFound";
// auto deploy test

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              {/* ROOT */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* PUBLIC */}
              <Route path="/login" element={<Login />} />

              {/* SELECT SOCIETY */}
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

                {/* MODULES */}
                <Route path="architecture" element={<ArchitectureModule />} />
                <Route path="materials" element={<MaterialsModule />} />
                <Route path="tmi" element={<TMIModule />} />
                <Route path="finance" element={<PlaceholderModule />} />
                <Route path="compliance" element={<ComplianceDashboard />} />

                {/* CIVIL MODULE */}
                <Route path="civil">
                  <Route index element={<CivilHome />} />

                  {/* Engineer Screens */}
                  <Route path="rcc-checklist" element={<RCCChecklist />} />
                  <Route path="block-work" element={<BlockWorkChecklist />} />

                  {/* Admin / PMC Review Screens */}
                  <Route
                    path="rcc-review"
                    element={
                      <RoleGuard roles={["admin", "pmc"]}>
                        <RCCChecklistReview />
                      </RoleGuard>
                    }
                  />
                  <Route
                    path="block-work-review"
                    element={
                      <RoleGuard roles={["admin", "pmc"]}>
                        <BlockWorkChecklistReview />
                      </RoleGuard>
                    }
                  />
                </Route>
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

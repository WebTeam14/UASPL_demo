import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";

import Login from "@/pages/Login";
import SelectSociety from "@/pages/SelectSociety";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import ArchitectureModule from "@/pages/dashboard/ArchitectureModule";
import MaterialsModule from "@/pages/dashboard/MaterialsModule";
import TMIModule from "@/pages/dashboard/TMIModule";
import PlaceholderModule from "@/pages/dashboard/PlaceholderModule";
import ComplianceDashboard from "@/pages/dashboard/compliance/ComplianceDashboard";
import SocietyPage from "@/pages/dashboard/SocietyPage";
import VendorDirectory from "@/pages/dashboard/VendorDirectory";
import ProgressModule from "@/pages/dashboard/ProgressModule";

import CivilHome from "@/pages/dashboard/civil/CivilHome";
import RCCChecklist from "@/pages/dashboard/civil/RCCChecklist";
import RCCChecklistReview from "@/pages/dashboard/civil/RCCChecklistReview";
import BlockWorkChecklist from "@/pages/dashboard/civil/BlockWorkChecklist";
import BlockWorkChecklistReview from "@/pages/dashboard/civil/BlockWorkChecklistReview";

import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
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

          {/* ✅ SOCIETY CRUD — ADMIN / PROJECT_ADMIN ONLY */}
          <Route
            path="societies"
            element={
              <RoleGuard roles={["admin", "project_admin"]}>
                <SocietyPage />
              </RoleGuard>
            }
          />

          <Route path="architecture" element={<ArchitectureModule />} />
          <Route path="materials" element={<MaterialsModule />} />
          <Route path="tmi" element={<TMIModule />} />
          <Route path="vendors" element={<VendorDirectory />} />
          <Route path="progress" element={<ProgressModule />} />
          <Route path="finance" element={<PlaceholderModule />} />
          <Route path="compliance" element={<ComplianceDashboard />} />
          
          {/* CIVIL MODULE */}
          <Route path="civil">
            <Route index element={<CivilHome />} />

            {/* Engineer Screens */}
            <Route path="rcc-checklist" element={<RCCChecklist />} />
            <Route path="block-work" element={<BlockWorkChecklist />} />

            {/* Admin / Project Admin */}
            <Route
              path="rcc-review"
              element={
                <RoleGuard roles={["admin", "project_admin"]}>
                  <RCCChecklistReview />
                </RoleGuard>
              }
            />
            <Route
              path="block-work-review"
              element={
                <RoleGuard roles={["admin", "project_admin"]}>
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
  );
}

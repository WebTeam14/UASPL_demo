import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectSociety from "./pages/SelectSociety";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ArchitectureModule from "./pages/dashboard/ArchitectureModule";
import MaterialsModule from "./pages/dashboard/MaterialsModule";
import TMIModule from "./pages/dashboard/TMIModule";
import PlaceholderModule from "./pages/dashboard/PlaceholderModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

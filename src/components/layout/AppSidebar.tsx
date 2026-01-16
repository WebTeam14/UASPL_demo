import { useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  Building2,
  HardHat,
  Wrench,
  Users,
  TrendingUp,
  Package,
  Warehouse,
  ClipboardCheck,
  Wallet,
  LayoutDashboard,
  Settings,
  HelpCircle,
  ChevronLeft,
  LogOut,
  Building,
<<<<<<< HEAD
} from "lucide-react";
=======
  Globe,
} from "lucide-react";

>>>>>>> 89a3e2f (Updated UI and latest fixes)
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
<<<<<<< HEAD
=======

>>>>>>> 89a3e2f (Updated UI and latest fixes)
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { modules } from "@/data/mockData";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Building2,
  HardHat,
  Wrench,
  Users,
  TrendingUp,
  Package,
  Warehouse,
  ClipboardCheck,
  Wallet,
};

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, selectedSociety, clearSociety, logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const userModules = modules.filter(
    (m) => user?.role && m.allowedRoles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
<<<<<<< HEAD
    navigate("/");
=======
    navigate("/login", { replace: true });
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  };

  const handleChangeSociety = () => {
    clearSociety();
    navigate("/select-society");
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
<<<<<<< HEAD
=======
      {/* ================= HEADER ================= */}
>>>>>>> 89a3e2f (Updated UI and latest fixes)
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "transition-all duration-200",
            isCollapsed ? "flex justify-center" : ""
          )}
        >
          <Logo
            variant="light"
            size={isCollapsed ? "sm" : "md"}
            showText={!isCollapsed}
          />
        </div>

        {!isCollapsed && selectedSociety && (
<<<<<<< HEAD
          <div
            className="mt-4 p-3 rounded-lg bg-sidebar-accent cursor-pointer hover:bg-sidebar-accent/80 transition-colors"
            onClick={handleChangeSociety}
          >
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-sidebar-foreground/70" />

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-sidebar-foreground truncate">
                  {selectedSociety.name}
                </div>
                <div className="text-xs text-sidebar-foreground/60">
                  {selectedSociety.code}
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-sidebar-foreground/50" />
=======
          <div className="mt-4 p-3 rounded-lg bg-sidebar-accent transition-colors">
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 mt-1 text-sidebar-foreground/70" />

              <div className="flex-1 min-w-0">
                {/* Society Name */}
                <div
                  className="text-sm font-medium text-sidebar-foreground truncate cursor-pointer"
                  onClick={handleChangeSociety}
                >
                  {selectedSociety.name}
                </div>

                {/* Society Code */}
                <div className="text-xs text-sidebar-foreground/60">
                  {selectedSociety.code}
                </div>

                {/* ✅ CLICKABLE WEBSITE LINK */}
                {selectedSociety.website && (
                  <a
                    href={selectedSociety.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 flex items-center gap-1 text-xs text-blue-400 hover:underline"
                  >
                    <Globe className="w-3 h-3" />
                    {selectedSociety.website.replace("https://", "")}
                  </a>
                )}
              </div>

              <ChevronLeft
                className="w-4 h-4 mt-1 text-sidebar-foreground/50 cursor-pointer"
                onClick={handleChangeSociety}
              />
>>>>>>> 89a3e2f (Updated UI and latest fixes)
            </div>
          </div>
        )}
      </SidebarHeader>

<<<<<<< HEAD
=======
      {/* ================= CONTENT ================= */}
>>>>>>> 89a3e2f (Updated UI and latest fixes)
      <SidebarContent className="scrollbar-thin">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            {isCollapsed ? "" : "Overview"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/dashboard")}
                  isActive={location.pathname === "/dashboard"}
<<<<<<< HEAD
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
=======
>>>>>>> 89a3e2f (Updated UI and latest fixes)
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {!isCollapsed && <span>Dashboard</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            {isCollapsed ? "" : "Modules"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userModules.map((module) => {
                const Icon = iconMap[module.icon] || Package;
                const isActive = location.pathname === module.route;

                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton
                      onClick={() => navigate(module.route)}
                      isActive={isActive}
<<<<<<< HEAD
                      className="text-sidebar-foreground hover:bg-sidebar-accent"
=======
>>>>>>> 89a3e2f (Updated UI and latest fixes)
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{module.name}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
<<<<<<< HEAD

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            {isCollapsed ? "" : "System"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent">
                  <Settings className="w-5 h-5" />
                  {!isCollapsed && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent">
                  <HelpCircle className="w-5 h-5" />
                  {!isCollapsed && <span>Help & Support</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

=======
      </SidebarContent>

      {/* ================= FOOTER ================= */}
>>>>>>> 89a3e2f (Updated UI and latest fixes)
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-sidebar-accent">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </div>
              <div className="text-xs text-sidebar-foreground/60 capitalize">
                {user.role}
              </div>
            </div>
          </div>
        )}
<<<<<<< HEAD
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
=======

        <Button
          variant="ghost"
          className="w-full justify-start"
>>>>>>> 89a3e2f (Updated UI and latest fixes)
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {!isCollapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

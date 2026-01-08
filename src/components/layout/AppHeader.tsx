import { Bell, Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const routeNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/compliance': 'Compliance',
  '/dashboard/architecture': 'Architecture',
  '/dashboard/civil': 'Civil',
  '/dashboard/mep': 'MEP',
  '/dashboard/meetings': 'Society Meetings',
  '/dashboard/development': 'Development',
  '/dashboard/materials': 'Material Management',
  '/dashboard/store': 'Store & Dispatch',
  '/dashboard/tmi': 'TMI',
  '/dashboard/finance': 'Finance & HR',
};

export function AppHeader() {
  const location = useLocation();
  const { user, selectedSociety } = useAuth();

  const currentRoute = routeNames[location.pathname] || 'Dashboard';
  
  const breadcrumbs = [
    { label: selectedSociety?.name || 'Society', path: '/select-society' },
    { label: currentRoute, path: location.pathname },
  ];

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              <span className={index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                {crumb.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden lg:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-64 pl-9 h-9 bg-muted/50 border-transparent focus:bg-background focus:border-border"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
              <span className="font-medium">Drawing Approved</span>
              <span className="text-sm text-muted-foreground">Floor Plan L1 has been approved</span>
              <span className="text-xs text-muted-foreground mt-1">2 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
              <span className="font-medium">New Comment</span>
              <span className="text-sm text-muted-foreground">Rajesh commented on Structural Layout</span>
              <span className="text-xs text-muted-foreground mt-1">4 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
              <span className="font-medium">Inspection Scheduled</span>
              <span className="text-sm text-muted-foreground">Foundation inspection on Jan 20</span>
              <span className="text-xs text-muted-foreground mt-1">1 day ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

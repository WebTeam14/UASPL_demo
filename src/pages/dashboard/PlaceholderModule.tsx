import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

const moduleNames: Record<string, string> = {
  '/dashboard/compliance': 'Compliance',
  '/dashboard/civil': 'Civil',
  '/dashboard/mep': 'MEP',
  '/dashboard/meetings': 'Society Meetings',
  '/dashboard/development': 'Development',
  '/dashboard/store': 'Store & Dispatch',
  '/dashboard/finance': 'Finance & HR',
};

export default function PlaceholderModule() {
  const location = useLocation();
  const moduleName = moduleNames[location.pathname] || 'Module';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {moduleName} Module
      </h1>
      <p className="text-muted-foreground max-w-md">
        This module is under development. The full functionality will be available soon with complete features for {moduleName.toLowerCase()} management.
      </p>
    </div>
  );
}

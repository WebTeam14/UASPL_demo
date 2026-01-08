import { useNavigate } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { modules } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

const colorMap: Record<string, string> = {
  "bg-blue-500":
    "bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white",
  "bg-indigo-500":
    "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white",
  "bg-amber-500":
    "bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white",
  "bg-green-500":
    "bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white",
  "bg-purple-500":
    "bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-white",
  "bg-cyan-500":
    "bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500 hover:text-white",
  "bg-orange-500":
    "bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white",
  "bg-teal-500":
    "bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white",
  "bg-red-500": "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white",
  "bg-emerald-500":
    "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white",
};

export function ModuleGrid() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userModules = modules.filter(
    (m) => user?.role && m.allowedRoles.includes(user.role)
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {userModules.map((module) => {
        const Icon = iconMap[module.icon] || Package;
        const iconColorClass =
          colorMap[module.color] || colorMap["bg-blue-500"];

        return (
          <Button
            key={module.id}
            variant="outline"
            onClick={() => navigate(module.route)}
            className="group h-16 w-full justify-between px-4 text-left hover:shadow-md transition-all"
          >
            {/* Left: Icon */}
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                iconColorClass
              )}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Center: Module Name */}
            <div className="flex-1 px-4">
              <div className="font-medium text-foreground">{module.name}</div>
            </div>

            {/* Right: Arrow */}
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Button>
        );
      })}
    </div>
  );
}

import {
  FolderOpen,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  FileText,
  Calendar,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";
import { useAuth } from "@/contexts/AuthContext";
import {
  dashboardStats,
  projects,
  drawings,
  inspections,
} from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardHome() {
  const { user, selectedSociety } = useAuth();

  const stats = user?.role
    ? dashboardStats[user.role as keyof typeof dashboardStats]
    : null;

  /* ---------------- GREETING ---------------- */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "in-progress": "bg-blue-500/10 text-blue-600 border-blue-200",
      planning: "bg-amber-500/10 text-amber-600 border-amber-200",
      completed: "bg-green-500/10 text-green-600 border-green-200",
      "on-hold": "bg-gray-500/10 text-gray-600 border-gray-200",
      approved: "bg-green-500/10 text-green-600 border-green-200",
      "pending-review": "bg-amber-500/10 text-amber-600 border-amber-200",
      draft: "bg-gray-500/10 text-gray-600 border-gray-200",
      scheduled: "bg-blue-500/10 text-blue-600 border-blue-200",
      passed: "bg-green-500/10 text-green-600 border-green-200",
      failed: "bg-red-500/10 text-red-600 border-red-200",
    };
    return styles[status] ?? styles.planning;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ================= WELCOME ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {selectedSociety?.name ?? "Society"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with {selectedSociety?.name} today
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* ================= ADMIN STATS ================= */}
      {user?.role === "admin" && stats && "totalProjects" in stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            subtitle={`${stats.activeProjects} active`}
            icon={FolderOpen}
            variant="primary"
          />
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Team Members"
            value={stats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Compliance Score"
            value={`${stats.complianceScore}%`}
            icon={CheckCircle}
            variant="success"
          />
        </div>
      )}

      {/* ================= MODULES ================= */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Modules</h2>
        <ModuleGrid />
      </div>

      {/* ================= ACTIVITY ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Started {project.startDate}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusBadge(project.status)}
                  >
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className="mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Drawings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Recent Drawings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {drawings.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{d.name}</p>
                    <p className="text-sm text-muted-foreground">
                      v{d.version} • {d.uploadedBy}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusBadge(d.status)}
                >
                  {d.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">₹15Cr</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">₹6.75Cr</p>
                <p className="text-sm text-muted-foreground">Amount Spent</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Society Members</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">45%</p>
                <p className="text-sm text-muted-foreground">Avg. Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

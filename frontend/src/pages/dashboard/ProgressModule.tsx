import { useState } from "react";
import {
  TrendingUp,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { progressReports } from "@/data/mockData";

export default function ProgressModule() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = progressReports.filter(
    (report) =>
      report.projectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.task
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const completedCount = progressReports.filter(
    (r) => r.status === "completed"
  ).length;

  const pendingCount = progressReports.filter(
    (r) => r.status === "pending"
  ).length;

  const inProgressCount = progressReports.filter(
    (r) => r.status === "in-progress"
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          color:
            "bg-success/10 text-success border-success/20",
          icon: CheckCircle2,
        };

      case "in-progress":
        return {
          label: "In Progress",
          color:
            "bg-primary/10 text-primary border-primary/20",
          icon: Loader2,
        };

      default:
        return {
          label: "Pending",
          color:
            "bg-warning/10 text-warning border-warning/20",
          icon: Clock,
        };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Progress Tracking
          </h1>

          <p className="text-muted-foreground">
            Monitor redevelopment project progress
          </p>
        </div>

        <Button className="btn-primary-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Add Progress
        </Button>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-4 gap-4">

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {progressReports.length}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Reports
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {completedCount}
            </p>
            <p className="text-sm text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {inProgressCount}
            </p>
            <p className="text-sm text-muted-foreground">
              In Progress
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {pendingCount}
            </p>
            <p className="text-sm text-muted-foreground">
              Pending
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Search */}
      <Card className="enterprise-card">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              placeholder="Search progress reports..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports */}
      <div className="grid gap-4">

        {filteredReports.map((report) => {
          const StatusIcon =
            getStatusBadge(report.status).icon;

          return (
            <Card
              key={report.id}
              className="enterprise-card"
            >
              <CardContent className="pt-6">

                <div className="flex justify-between items-start">

                  <div className="space-y-3 flex-1">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {report.projectName}
                      </h3>

                      <p className="text-muted-foreground">
                        {report.task}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {report.progress}%
                        </span>
                      </div>

                      <Progress
                        value={report.progress}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Created By: {report.createdBy}
                    </div>

                  </div>

                  <div className="flex flex-col items-end gap-2">

                    <Badge
                      variant="outline"
                      className={
                        getStatusBadge(report.status)
                          .color
                      }
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {
                        getStatusBadge(report.status)
                          .label
                      }
                    </Badge>

                    <span className="text-xs text-muted-foreground">
                      {report.createdAt}
                    </span>

                  </div>

                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
}
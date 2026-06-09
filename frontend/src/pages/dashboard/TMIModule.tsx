import { useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Eye,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { inspections } from '@/data/mockData';

export default function TMIModule() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; icon: React.ElementType }> = {
      'scheduled': { color: 'bg-blue-500/10 text-blue-600 border-blue-200', icon: Calendar },
      'in-progress': { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
      'passed': { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
      'failed': { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
    };
    return configs[status] || configs['scheduled'];
  };

  const filteredInspections = inspections.filter(i =>
    i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.inspector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const passedCount = inspections.filter(i => i.status === 'passed').length;
  const failedCount = inspections.filter(i => i.status === 'failed').length;
  const passRate = inspections.length > 0 
    ? Math.round((passedCount / (passedCount + failedCount || 1)) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">TMI - Testing, Monitoring & Inspection</h1>
          <p className="text-muted-foreground">
            Manage quality inspections and compliance testing
          </p>
        </div>
        <Button className="btn-primary-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Inspection
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inspections.length}</p>
                <p className="text-sm text-muted-foreground">Total Inspections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {inspections.filter(i => i.status === 'scheduled').length}
                </p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{passRate}%</p>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{failedCount}</p>
                <p className="text-sm text-muted-foreground">Failed Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspections Table */}
      <Card className="enterprise-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Inspections</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search inspections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Inspection Type</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => {
                const statusConfig = getStatusConfig(inspection.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <TableRow key={inspection.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                          <ClipboardCheck className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{inspection.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {inspection.scheduledDate}
                      </div>
                    </TableCell>
                    <TableCell>{inspection.inspector}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {inspection.notes || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                          </DropdownMenuItem>
                          {inspection.status === 'scheduled' && (
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Start Inspection
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

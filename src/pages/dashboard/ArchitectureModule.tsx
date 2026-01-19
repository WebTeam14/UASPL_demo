import { useState } from 'react';
import {
  FileText,
  Upload,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { drawings } from '@/data/mockData';

export default function ArchitectureModule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrawing, setSelectedDrawing] = useState<typeof drawings[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending-review':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'approved': 'bg-success/10 text-success border-success/20',
      'rejected': 'bg-destructive/10 text-destructive border-destructive/20',
      'pending-review': 'bg-warning/10 text-warning border-warning/20',
      'draft': 'bg-muted text-muted-foreground border-muted',
    };
    return styles[status] || styles['draft'];
  };

  const filteredDrawings = drawings.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Architecture</h1>
          <p className="text-muted-foreground">
            Manage architectural drawings and design documents
          </p>
        </div>
        <Button className="btn-primary-gradient">
          <Upload className="w-4 h-4 mr-2" />
          Upload Drawing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{drawings.length}</p>
                <p className="text-sm text-muted-foreground">Total Drawings</p>
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
                <p className="text-2xl font-bold">
                  {drawings.filter(d => d.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {drawings.filter(d => d.status === 'pending-review').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {drawings.reduce((acc, d) => acc + d.comments.filter(c => !c.resolved).length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Open Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drawings Table */}
      <Card className="enterprise-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Drawings</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search drawings..."
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
                <TableHead>Drawing Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrawings.map((drawing) => (
                <TableRow key={drawing.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{drawing.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">v{drawing.version}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(drawing.status)}>
                      <span className="flex items-center gap-1.5">
                        {getStatusIcon(drawing.status)}
                        {drawing.status.replace('-', ' ')}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>{drawing.uploadedBy}</TableCell>
                  <TableCell>{drawing.uploadedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span>{drawing.comments.length}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => {
                              e.preventDefault();
                              setSelectedDrawing(drawing);
                            }}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </Dialog>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add Comment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drawing Details Dialog */}
      <Dialog open={!!selectedDrawing} onOpenChange={() => setSelectedDrawing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {selectedDrawing?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedDrawing && (
            <div className="space-y-6">
              {/* Drawing Preview Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-2" />
                  <p>Drawing Preview</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="font-medium">v{selectedDrawing.version}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={getStatusBadge(selectedDrawing.status)}>
                    {selectedDrawing.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded By</p>
                  <p className="font-medium">{selectedDrawing.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{selectedDrawing.uploadedAt}</p>
                </div>
              </div>

              {/* Comments Section */}
              {selectedDrawing.comments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Comments</h4>
                  <div className="space-y-3">
                    {selectedDrawing.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                        <Badge
                          variant="outline"
                          className={comment.resolved ? 'mt-2 bg-success/10 text-success' : 'mt-2 bg-warning/10 text-warning'}
                        >
                          {comment.resolved ? 'Resolved' : 'Open'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="btn-primary-gradient">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
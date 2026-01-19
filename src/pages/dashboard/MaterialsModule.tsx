import { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Edit,
  Trash2,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
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
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { materials } from '@/data/mockData';
import { Material } from '@/types/modules';

export default function MaterialsModule() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [materialsList, setMaterialsList] = useState<Material[]>(() => {
    const stored = localStorage.getItem('uaspl-materials');
    return stored ? JSON.parse(stored) : materials;
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('uaspl-materials', JSON.stringify(materialsList));
  }, [materialsList]);

  const canManageStatus = user?.role === 'admin' || user?.role === 'project admin' || user?.role === 'engineer';
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: '',
    category: '',
    unit: '',
    quantity: 0,
    minStock: 0,
    location: '',
  });

  const filteredMaterials = materialsList.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setMaterialsList(prev => prev.map(m =>
      m.id === id ? { ...m, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : m
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return { label: 'Approved', color: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 };
      case 'rejected':
        return { label: 'Rejected', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle };
      default:
        return { label: 'Pending', color: 'bg-warning/10 text-warning border-warning/20', icon: Clock };
    }
  };

  const handleAddMaterial = () => {
    const material: Material = {
      ...newMaterial as Material,
      id: (materialsList.length + 1).toString(),
      status: 'pending',
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setMaterialsList(prev => [material, ...prev]);
    setIsDialogOpen(false);
    setNewMaterial({
      name: '',
      category: '',
      unit: '',
      quantity: 0,
      minStock: 0,
      location: '',
    });
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    const ratio = quantity / minStock;
    if (ratio <= 1) return { label: 'Low Stock', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertTriangle };
    if (ratio <= 2) return { label: 'Medium', color: 'bg-warning/10 text-warning border-warning/20', icon: TrendingDown };
    return { label: 'Sufficient', color: 'bg-success/10 text-success border-success/20', icon: TrendingUp };
  };

  const lowStockCount = materialsList.filter(m => m.quantity <= m.minStock).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Material Management</h1>
          <p className="text-muted-foreground">
            Track and manage construction materials and inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Material</DialogTitle>
                <DialogDescription>
                  Enter the details of the new material to add to the inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    value={newMaterial.unit}
                    placeholder="e.g. Bags, Tonnes"
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minStock" className="text-right">
                    Min Stock
                  </Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newMaterial.minStock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minStock: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newMaterial.location}
                    onChange={(e) => setNewMaterial({ ...newMaterial, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button className="btn-primary-gradient" onClick={handleAddMaterial}>Save Material</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{materialsList.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockCount}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹24.5L</p>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials Table */}
      <Card className="enterprise-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Inventory</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
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
                <TableHead>Material</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => {
                const stockStatus = getStockStatus(material.quantity, material.minStock);
                const stockPercentage = Math.min((material.quantity / (material.minStock * 3)) * 100, 100);
                const StatusIcon = stockStatus.icon;

                return (
                  <TableRow key={material.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{material.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{material.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{material.quantity.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">{material.unit}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 w-32">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={stockStatus.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {stockStatus.label}
                          </Badge>
                        </div>
                        <Progress
                          value={stockPercentage}
                          className={`h-1.5 ${stockPercentage <= 33 ? '[&>div]:bg-destructive' :
                            stockPercentage <= 66 ? '[&>div]:bg-warning' :
                              '[&>div]:bg-success'
                            }`}
                        />
                        <p className="text-xs text-muted-foreground">
                          Min: {material.minStock} {material.unit}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{material.location}</TableCell>
                    <TableCell>
                      {(() => {
                        const statusObj = getStatusBadge(material.status);
                        const StatusIcon = statusObj.icon;
                        return (
                          <Badge variant="outline" className={statusObj.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusObj.label}
                          </Badge>
                        );
                      })()}
                    </TableCell>
                    <TableCell>{material.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Stock
                          </DropdownMenuItem>
                          {canManageStatus && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(material.id, 'approved')} className="text-success">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(material.id, 'rejected')} className="text-destructive">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(material.id, 'pending')} className="text-warning">
                                <Clock className="w-4 h-4 mr-2" />
                                Mark as Pending
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
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

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Users,
  Search,
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { vendors } from "@/data/mockData";

export default function VendorDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const activeVendors = vendors.filter(
    (v) => v.status === "active"
  ).length;

  const pendingVendors = vendors.filter(
    (v) => v.status === "pending"
  ).length;

  const categories = new Set(
    vendors.map((v) => v.category)
  ).size;

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vendor.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Vendor Directory
          </h1>

          <p className="text-muted-foreground">
            Manage contractors, consultants and suppliers
          </p>
        </div>

        <Button className="btn-primary-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {vendors.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Vendors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {activeVendors}
                </p>
                <p className="text-sm text-muted-foreground">
                  Active Vendors
                </p>
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
                  {pendingVendors}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pending Approval
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-500" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {categories}
                </p>
                <p className="text-sm text-muted-foreground">
                  Categories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="enterprise-card">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                placeholder="Search vendors..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <select className="border rounded-md px-3 py-2 bg-background">
              <option>All Categories</option>
              <option>Contractor</option>
              <option>Consultant</option>
              <option>Supplier</option>
            </select>

            <select className="border rounded-md px-3 py-2 bg-background">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Add Vendor Form UI */}
      <Card className="enterprise-card">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">
            Add Vendor
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Company Name" />
            <Input placeholder="Contact Person" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Email Address" />
            <Input placeholder="Category" />
            <Input placeholder="Vendor Status" />

            <div className="md:col-span-2">
              <Input placeholder="Address" />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="btn-primary-gradient">
              Save Vendor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendor List */}
      <div className="grid gap-4">
        {filteredVendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="enterprise-card hover:shadow-md transition-all"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-primary" />

                    <h3 className="font-semibold text-lg">
                      {vendor.companyName}
                    </h3>

                    <Badge variant="secondary">
                      {vendor.category}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {vendor.contactPerson}
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {vendor.phone}
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {vendor.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {vendor.address}
                  </div>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="outline">
                      GST Verified
                    </Badge>

                    <Badge variant="outline">
                      ISO Certified
                    </Badge>

                    <Badge variant="outline">
                      Active Projects: 5
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={
                      vendor.status === "active"
                        ? "bg-success/10 text-success"
                        : vendor.status === "pending"
                        ? "bg-warning/10 text-warning"
                        : "bg-destructive/10 text-destructive"
                    }
                  >
                    {vendor.status}
                  </Badge>

                  <span className="text-xs text-muted-foreground">
                    Added: {vendor.createdAt}
                  </span>

                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
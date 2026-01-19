import { Compliance } from "./types";
import ComplianceActions from "./ComplianceActions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, User, Calendar } from "lucide-react";

const mockData: Compliance[] = [
    {
        id: "1",
        chsId: "CHS001",
        name: "Fire NOC",
        category: "LEGAL",
        uploadedBy: "Rahul Sharma",
        department: "Legal Dept",
        expiryDate: "2025-09-15",
        status: "EXPIRING_SOON",
        approvalStatus: "PENDING",
        createdAt: "2025-01-01",
    },
    {
        id: "2",
        chsId: "CHS001",
        name: "Elevator License",
        category: "SAFETY",
        uploadedBy: "Anil Kumar",
        department: "Safety Dept",
        expiryDate: "2026-03-10",
        status: "VALID",
        approvalStatus: "APPROVED",
        createdAt: "2025-02-15",
    },
    {
        id: "3",
        chsId: "CHS001",
        name: "Property Tax Receipt",
        category: "LEGAL",
        uploadedBy: "Rahul Sharma",
        department: "Legal Dept",
        expiryDate: "2024-12-31",
        status: "EXPIRED",
        approvalStatus: "APPROVED",
        createdAt: "2024-01-10",
    },
];

const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
        VALID: "bg-success/10 text-success border-success/20",
        EXPIRED: "bg-destructive/10 text-destructive border-destructive/20",
        EXPIRING_SOON: "bg-warning/10 text-warning border-warning/20",
        PENDING: "bg-info/10 text-info border-info/20",
    };

    return (
        <Badge variant="outline" className={styles[status]}>
            {status.replace("_", " ")}
        </Badge>
    );
};

const ComplianceTable = ({ activeTab }: { activeTab: string }) => {
    // Basic filtering logic for demonstration
    const filteredData = activeTab === "OVERVIEW"
        ? mockData
        : mockData.filter(d => d.category === activeTab);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="w-[300px]">Compliance Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-primary" />
                                        </div>
                                        <span>{row.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal">
                                        {row.category}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{row.uploadedBy}</span>
                                        <span className="text-xs text-muted-foreground">{row.department}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        <span className="text-sm">{row.expiryDate}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{statusBadge(row.status)}</TableCell>
                                <TableCell className="text-right">
                                    <ComplianceActions compliance={row} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                No compliance documents found for this category.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ComplianceTable;

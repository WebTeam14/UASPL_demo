import { Compliance } from "./types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardCheck } from "lucide-react";

const pendingApprovals: Compliance[] = [
    {
        id: "4",
        chsId: "CHS001",
        name: "Lift Safety Certificate",
        category: "SAFETY",
        uploadedBy: "Anil Kumar",
        department: "Safety Dept",
        expiryDate: "2025-04-20",
        status: "EXPIRED",
        approvalStatus: "PENDING",
        createdAt: "2025-02-01",
    },
];

const ApprovalQueue = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h2>Pending Approvals</h2>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[300px]">Compliance Document</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Uploaded By</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {pendingApprovals.length > 0 ? (
                            pendingApprovals.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            <span>{item.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.uploadedBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No pending approvals found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ApprovalQueue;

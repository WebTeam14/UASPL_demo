import { Compliance } from "./types";
import { Button } from "@/components/ui/button";
import { Eye, Check, X } from "lucide-react";

const ComplianceActions = ({ compliance }: { compliance: Compliance }) => {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details">
                <Eye className="w-4 h-4 text-muted-foreground" />
            </Button>

            {compliance.approvalStatus === "PENDING" && (
                <>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-success hover:bg-success/10"
                        title="Approve"
                    >
                        <Check className="w-4 h-4 text-success" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10"
                        title="Reject"
                    >
                        <X className="w-4 h-4 text-destructive" />
                    </Button>
                </>
            )}
        </div>
    );
};

export default ComplianceActions;

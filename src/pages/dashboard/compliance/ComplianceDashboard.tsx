import ComplianceStats from "./ComplianceStats";
import ComplianceTabs from "./ComplianceTabs";
import { Shield } from "lucide-react";

const ComplianceDashboard = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary" />
                        Compliance Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor and manage regulatory compliance, documents, and approvals.
                    </p>
                </div>
            </div>

            <ComplianceStats />

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                    <ComplianceTabs />
                </div>
            </div>
        </div>
    );
};

export default ComplianceDashboard;

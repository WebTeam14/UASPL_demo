import { StatCard } from "@/components/dashboard/StatCard";
import { CheckCircle, AlertCircle, Clock, FileText, Hourglass } from "lucide-react";

const ComplianceStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
                title="Total Documents"
                value={28}
                icon={FileText}
                variant="default"
            />
            <StatCard
                title="Valid"
                value={18}
                icon={CheckCircle}
                variant="success"
            />
            <StatCard
                title="Expiring Soon"
                value={6}
                icon={Clock}
                variant="warning"
            />
            <StatCard
                title="Expired"
                value={4}
                icon={AlertCircle}
                variant="destructive"
            />
            <StatCard
                title="Pending Approval"
                value={3}
                icon={Hourglass}
                variant="primary"
            />
        </div>
    );
};

export default ComplianceStats;

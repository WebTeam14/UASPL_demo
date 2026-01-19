import { useSearchParams } from "react-router-dom";
import ComplianceTable from "./ComplianceTable";
import ApprovalQueue from "./ApprovalQueue";
import ComplianceFilters from "./ComplianceFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const segments = [
    { label: "Overview", value: "OVERVIEW" },
    { label: "Legal", value: "LEGAL" },
    { label: "Safety", value: "SAFETY" },
    { label: "Labor", value: "LABOR" },
    { label: "Documents", value: "DOCUMENTS" },
    { label: "Approval Queue", value: "APPROVAL_QUEUE" },
];

const ComplianceTabs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "OVERVIEW";

    const handleTabChange = (value: string) => {
        if (value === "OVERVIEW") {
            searchParams.delete("tab");
        } else {
            searchParams.set("tab", value);
        }
        setSearchParams(searchParams);
    };

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList className="bg-muted/50 p-1">
                    {segments.map((segment) => (
                        <TabsTrigger
                            key={segment.value}
                            value={segment.value}
                            className="px-4 py-2 text-xs uppercase tracking-wider"
                        >
                            {segment.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {activeTab !== "APPROVAL_QUEUE" && <ComplianceFilters />}
            </div>

            {segments.map((segment) => (
                <TabsContent key={segment.value} value={segment.value} className="mt-0 outline-none">
                    {segment.value === "APPROVAL_QUEUE" ? (
                        <ApprovalQueue />
                    ) : (
                        <ComplianceTable activeTab={segment.value} />
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default ComplianceTabs;

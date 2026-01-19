import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ComplianceFilters = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search compliance..." className="pl-9 h-10" />
            </div>

            <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40 h-10">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="labor">Labor</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40 h-10">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ComplianceFilters;

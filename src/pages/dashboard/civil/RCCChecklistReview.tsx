import { ClipboardCheck, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function CivilHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Civil Module</h1>
      <p className="text-muted-foreground">
        Civil engineering checklists, inspections & approvals
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* RCC CHECKLIST */}
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => navigate("rcc-checklist")}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">RCC Checklist</h3>
              <p className="text-sm text-muted-foreground">
                Fill RCC pour card & inspection
              </p>
            </div>
          </CardContent>
        </Card>

        {/* RCC REVIEW */}
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => navigate("rcc-review")}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">RCC Review</h3>
              <p className="text-sm text-muted-foreground">
                Review & approve checklist
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

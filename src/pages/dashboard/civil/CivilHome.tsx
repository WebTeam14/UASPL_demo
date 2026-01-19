import { ClipboardCheck, BrickWall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

type Status = "draft" | "submitted" | "approved" | "rejected";

export default function CivilHome() {
  const navigate = useNavigate();
  const { user, selectedSociety } = useAuth();

  /* 🔐 READ RCC STATUS */
  const rccRaw = selectedSociety
    ? localStorage.getItem(`rcc-checklist-${selectedSociety.id}`)
    : null;

  const rccStatus: Status = rccRaw
    ? JSON.parse(rccRaw).status
    : "draft";

  /* 🔐 READ BLOCK WORK STATUS (FIX FOR PROBLEM 4) */
  const blockRaw = selectedSociety
    ? localStorage.getItem(`block-work-${selectedSociety.id}`)
    : null;

  const blockStatus: Status = blockRaw
    ? JSON.parse(blockRaw).status
    : "draft";

  /* ✅ NAVIGATION HANDLERS */
  const handleRccClick = () => {
    if (user?.role === "admin" || user?.role === "pmc") {
      navigate("/dashboard/civil/rcc-review");
    } else {
      navigate("/dashboard/civil/rcc-checklist");
    }
  };

  const handleBlockWorkClick = () => {
    if (user?.role === "admin" || user?.role === "pmc") {
      navigate("/dashboard/civil/block-work-review");
    } else {
      navigate("/dashboard/civil/block-work");
    }
  };

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
          onClick={handleRccClick}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <ClipboardCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-semibold">RCC Checklist</h3>
              <p className="text-sm text-muted-foreground">
                RCC Pour Card & Inspection
              </p>

              {rccStatus === "submitted" && user?.role === "engineer" && (
                <p className="text-xs text-yellow-600 mt-1">
                  Submitted • Waiting for PMC approval
                </p>
              )}

              {rccStatus === "submitted" &&
                (user?.role === "admin" || user?.role === "pmc") && (
                  <p className="text-xs text-blue-600 mt-1">
                    Pending your review
                  </p>
                )}

              {rccStatus === "approved" && (
                <p className="text-xs text-green-600 mt-1">
                  Approved
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* BLOCK WORK CHECKLIST (FIXED) */}
        <Card
          className="cursor-pointer hover:shadow-md transition"
          onClick={handleBlockWorkClick}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <BrickWall className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-semibold">Block Work Checklist</h3>
              <p className="text-sm text-muted-foreground">
                Block & Plaster Work Inspection
              </p>

              {blockStatus === "submitted" && user?.role === "engineer" && (
                <p className="text-xs text-yellow-600 mt-1">
                  Submitted • Waiting for PMC approval
                </p>
              )}

              {blockStatus === "submitted" &&
                (user?.role === "admin" || user?.role === "pmc") && (
                  <p className="text-xs text-blue-600 mt-1">
                    Pending your review
                  </p>
                )}

              {blockStatus === "approved" && (
                <p className="text-xs text-green-600 mt-1">
                  Approved
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

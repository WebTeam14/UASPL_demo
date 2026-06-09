import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

type ChecklistRow = {
  section: string;
  item: string;
  checked: boolean;
  remark: string;
};

export default function RCCChecklistReview() {
  const { selectedSociety, user } = useAuth();

  /* 🔐 Role guard */
  if (!user || (user.role !== "admin" && user.role !== "pmc")) {
    return (
      <p className="text-red-600 font-medium">
        You are not authorized to review this checklist.
      </p>
    );
  }

  if (!selectedSociety) {
    return <p>No society selected.</p>;
  }

  const storageKey = `rcc-checklist-${selectedSociety.id}`;
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return <p>No RCC checklist submitted yet.</p>;
  }

  const parsed = JSON.parse(raw);

  const [instructions, setInstructions] = useState<string>(
    parsed.instructions || ""
  );
  const [status, setStatus] = useState<
    "draft" | "submitted" | "approved" | "rejected"
  >(parsed.status);

  const checklist: ChecklistRow[] = parsed.checklist || [];

  /* ✅ Update status (NO page reload) */
  const handleDecision = (newStatus: "approved" | "rejected") => {
    const updatedPayload = {
      ...parsed,
      status: newStatus,
      reviewedBy: {
        userId: user.id,
        name: user.name,
        role: user.role,
        date: new Date().toISOString(),
      },
      instructions,
    };

    localStorage.setItem(storageKey, JSON.stringify(updatedPayload));
    setStatus(newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">RCC Checklist Review</h1>
        <Badge variant="outline">{status.toUpperCase()}</Badge>
      </div>

      {/* 🔹 Checklist Summary */}
      {checklist.map((row, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{row.section}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <b>Item:</b> {row.item}
            </p>
            <p>
              <b>Checked:</b>{" "}
              <span
                className={row.checked ? "text-green-600" : "text-red-600"}
              >
                {row.checked ? "YES" : "NO"}
              </span>
            </p>
            <p>
              <b>Engineer Remark:</b> {row.remark || "-"}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* 📝 PMC Instructions (matches Site Visit Report) */}
      <Card>
        <CardHeader>
          <CardTitle>PMC / Site Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter PMC observations / site instructions"
            disabled={status !== "submitted"}
          />
        </CardContent>
      </Card>

      {/* ✅ Approval Actions */}
      {status === "submitted" && (
        <div className="flex justify-end gap-3">
          <Button
            variant="destructive"
            onClick={() => handleDecision("rejected")}
          >
            Reject
          </Button>
          <Button onClick={() => handleDecision("approved")}>
            Approve
          </Button>
        </div>
      )}

      {/* 🔒 Final Message */}
      {status === "approved" && (
        <p className="text-green-600 font-medium">
          ✔ RCC Checklist approved and locked.
        </p>
      )}

      {status === "rejected" && (
        <p className="text-red-600 font-medium">
          ✖ RCC Checklist rejected. Engineer must revise.
        </p>
      )}
    </div>
  );
}

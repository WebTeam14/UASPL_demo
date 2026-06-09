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

export default function BlockWorkChecklistReview() {
  const { selectedSociety, user } = useAuth();

  if (!user || (user.role !== "admin" && user.role !== "pmc")) {
    return <p className="text-red-600">Not authorized.</p>;
  }

  if (!selectedSociety) {
    return <p>No society selected.</p>;
  }

  const storageKey = `block-work-${selectedSociety.id}`;
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return <p>No Block Work checklist submitted yet.</p>;
  }

  const parsed = JSON.parse(raw);

  const [status, setStatus] = useState(parsed.status || "submitted");
  const [instructions, setInstructions] = useState(
    parsed.instructions || ""
  );

  const checklist = parsed.checklist || [];

  const handleDecision = (newStatus: "approved" | "rejected") => {
    const updated = {
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

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setStatus(newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Block Work Checklist Review
        </h1>
        <Badge variant="outline">{status.toUpperCase()}</Badge>
      </div>

      {checklist.map((row: any, i: number) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{row.section}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><b>Item:</b> {row.item}</p>
            <p>
              <b>Checked:</b>{" "}
              {row.checked ? "YES" : "NO"}
            </p>
            <p>
              <b>Engineer Remark:</b>{" "}
              {row.remark || "-"}
            </p>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>PMC Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            disabled={status !== "submitted"}
            placeholder="Site instructions / observations"
          />
        </CardContent>
      </Card>

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
    </div>
  );
}

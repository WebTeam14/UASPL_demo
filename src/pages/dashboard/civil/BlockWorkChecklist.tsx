import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { BLOCK_WORK_SECTIONS } from "./data/blockWorkChecklistSchema";

type Status = "draft" | "submitted" | "approved" | "rejected";

export default function BlockWorkChecklist() {
  const { selectedSociety, user } = useAuth();

  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("draft");

  if (!selectedSociety || !user) {
    return <p className="text-muted-foreground">Society not selected.</p>;
  }

  const STORAGE_KEY = `block-work-${selectedSociety.id}`;
  const isLocked = status !== "draft";

  /* 🔐 LOAD EXISTING DATA (CRITICAL FIX) */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved);

    setStatus(parsed.status || "draft");

    const loadedChecks: Record<string, boolean> = {};
    const loadedRemarks: Record<string, string> = {};

    parsed.checklist?.forEach((row: any) => {
      const key = `${row.section}::${row.item}`;
      loadedChecks[key] = row.checked;
      loadedRemarks[key] = row.remark || "";
    });

    setChecks(loadedChecks);
    setRemarks(loadedRemarks);
  }, [STORAGE_KEY]);

  /* ✅ SUBMIT HANDLER */
  const handleSubmit = () => {
    const checklist = BLOCK_WORK_SECTIONS.flatMap((section) =>
      section.items.map((item) => {
        const key = `${section.title}::${item}`;
        return {
          section: section.title,
          item,
          checked: !!checks[key],
          remark: remarks[key] || "",
        };
      })
    );

    const payload = {
      societyId: selectedSociety.id,
      module: "civil",
      type: "block-work",
      date: new Date().toISOString(),
      checklist,
      submittedBy: {
        userId: user.id,
        name: user.name,
        role: user.role,
      },
      status: "submitted",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setStatus("submitted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Block Work Checklist</h1>
        <Badge variant="outline">{status.toUpperCase()}</Badge>
      </div>

      {BLOCK_WORK_SECTIONS.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {section.items.map((item) => {
              const key = `${section.title}::${item}`;
              return (
                <div
                  key={key}
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-5 font-medium">{item}</div>

                  <div className="col-span-2">
                    <Switch
                      disabled={isLocked}
                      checked={!!checks[key]}
                      onCheckedChange={(val) =>
                        setChecks((p) => ({ ...p, [key]: val }))
                      }
                    />
                  </div>

                  <div className="col-span-5">
                    <Textarea
                      disabled={isLocked}
                      placeholder="Remarks"
                      value={remarks[key] || ""}
                      onChange={(e) =>
                        setRemarks((p) => ({
                          ...p,
                          [key]: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button disabled={isLocked} onClick={handleSubmit}>
          Submit Block Work Checklist
        </Button>
      </div>

      {status === "submitted" && (
        <p className="text-yellow-600 text-sm">
          Submitted • Waiting for PMC approval
        </p>
      )}

      {status === "approved" && (
        <p className="text-green-600 text-sm">
          ✔ Approved and locked
        </p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

/* ✅ SAFE LOCAL DATA */
const RCC_SECTIONS = [
  {
    title: "Starter",
    items: [
      "Starter checked",
      "Starter steel as per schedule",
      "Starter shuttering",
    ],
  },
  {
    title: "Formwork",
    items: [
      "Line, level, plumb & dimensions checked",
      "Gap closing & oil applied",
      "Adequate supports & bracing",
      "Safe access & safety precautions",
    ],
  },
  {
    title: "Reinforcement",
    items: [
      "Bar dia & spacing as per drawing",
      "Cover blocks provided",
      "Lap length as per drawing",
    ],
  },
  {
    title: "Slab Checking",
    items: [
      "Slab shuttering level",
      "Slab steel",
      "Electrical conduits",
      "Plumbing sleeves & cut-outs",
    ],
  },
];

export default function RCCChecklist() {
  const { selectedSociety, user } = useAuth();

  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"draft" | "submitted" | "approved">(
    "draft"
  );

  /* 🔐 LOAD EXISTING DATA */
  useEffect(() => {
    if (!selectedSociety) return;

    const saved = localStorage.getItem(
      `rcc-checklist-${selectedSociety.id}`
    );

    if (saved) {
      const parsed = JSON.parse(saved);
      setStatus(parsed.status || "draft");

      const loadedChecks: Record<string, boolean> = {};
      const loadedRemarks: Record<string, string> = {};

      parsed.checklist?.forEach((row: any) => {
        const key = `${row.section}::${row.item}`;
        loadedChecks[key] = row.checked;
        loadedRemarks[key] = row.remark;
      });

      setChecks(loadedChecks);
      setRemarks(loadedRemarks);
    }
  }, [selectedSociety]);

  const isApproved = status === "approved";

  /* ✅ SUBMIT HANDLER */
  const handleSubmit = () => {
    if (!selectedSociety || !user) {
      alert("Society not selected");
      return;
    }

    const checklist = Object.keys(checks).map((key) => {
      const [section, item] = key.split("::");
      return {
        section,
        item,
        checked: checks[key],
        remark: remarks[key] || "",
      };
    });

    const payload = {
      societyId: selectedSociety.id,
      module: "civil",
      type: "rcc-checklist",
      date: new Date().toISOString(),
      checklist,
      submittedBy: {
        userId: user.id,
        name: user.name,
        role: user.role,
      },
      status: user.role === "engineer" ? "submitted" : "draft",

    };

    localStorage.setItem(
      `rcc-checklist-${selectedSociety.id}`,
      JSON.stringify(payload)
    );

    setStatus("submitted");
    alert("RCC Checklist submitted");
  };
  
    const existing = selectedSociety
  ? localStorage.getItem(`rcc-checklist-${selectedSociety.id}`)
  : null;

const isLocked = existing
  ? JSON.parse(existing).status !== "draft"
  : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">RCC Checklist & Pour Card</h1>
        <Badge variant="outline">{status.toUpperCase()}</Badge>
      </div>

      {RCC_SECTIONS.map((section) => (
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
  onCheckedChange={(value) =>
    setChecks((prev) => ({ ...prev, [key]: value }))
  }
/>

                  </div>

                  <div className="col-span-5">
                    <Textarea
  disabled={isLocked}
  value={remarks[key] || ""}
  placeholder="Remarks"
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
  Submit Checklist
</Button>

      </div>
    </div>
  );
}

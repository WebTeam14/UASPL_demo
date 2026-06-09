import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { RCC_SECTIONS } from "./data/rccChecklistSchema";

export default function RCCChecklist() {
  const { selectedSociety, user } = useAuth();

  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!selectedSociety || !user) {
    return <p className="text-muted-foreground">Society not selected.</p>;
  }

  const handleSubmit = () => {
    const checklist = RCC_SECTIONS.flatMap((section) =>
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
      status: "submitted",
      submittedAt: new Date().toISOString(),
      submittedBy: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      checklist,
    };

    localStorage.setItem(
      `rcc-checklist-${selectedSociety.id}`,
      JSON.stringify(payload)
    );

    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">RCC Checklist</h1>
        {submitted && <Badge>Submitted</Badge>}
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
                  <div className="col-span-5">{item}</div>

                  <div className="col-span-2">
                    <Switch
                      disabled={submitted}
                      checked={!!checks[key]}
                      onCheckedChange={(val) =>
                        setChecks((p) => ({ ...p, [key]: val }))
                      }
                    />
                  </div>

                  <div className="col-span-5">
                    <Textarea
                      disabled={submitted}
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
        <Button disabled={submitted} onClick={handleSubmit}>
          Submit Checklist
        </Button>
      </div>
    </div>
  );
}

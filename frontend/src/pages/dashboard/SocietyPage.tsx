import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

import {
  getSocieties,
  createSociety,
  updateSociety,
  deleteSociety,
} from "@/api/society.api";

/* ================= TYPES ================= */
interface Society {
  id: string;
  name: string;
  address?: string;
  websiteUrl?: string | null;
}

export default function SocietyPage() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingSociety, setEditingSociety] = useState<Society | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    loadSocieties();
  }, []);

  const loadSocieties = async () => {
    setLoading(true);
    try {
      const res = await getSocieties();

      /**
       * Expected backend response:
       * { data: Society[] }
       */
      const list = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
        ? res.data
        : [];

      setSocieties(list);
    } catch (err) {
      console.error("Failed to load societies", err);
      setSocieties([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSave = async () => {
    if (!name.trim()) return;

    setSaving(true);
    try {
      const payload = {
        name,
        address,
        websiteUrl: websiteUrl || null,
      };

      if (editingSociety) {
        await updateSociety(editingSociety.id, payload);
      } else {
        await createSociety(payload);
      }

      setOpen(false);
      resetForm();
      loadSocieties();
    } catch (err) {
      console.error("Failed to save society", err);
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this society?")) return;

    try {
      await deleteSociety(id);
      loadSocieties();
    } catch (err) {
      console.error("Failed to delete society", err);
    }
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setWebsiteUrl("");
    setEditingSociety(null);
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (society: Society) => {
    setEditingSociety(society);
    setName(society.name);
    setAddress(society.address || "");
    setWebsiteUrl(society.websiteUrl || "");
    setOpen(true);
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Societies</h1>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Society
        </Button>
      </div>

      {/* LIST */}
      <div className="grid gap-4">
        {societies.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No societies found.
          </div>
        )}

        {societies.map((society) => (
          <Card key={society.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-semibold">{society.name}</div>

                {society.address && (
                  <div className="text-sm text-muted-foreground">
                    {society.address}
                  </div>
                )}

                {society.websiteUrl && (
                  <a
                    href={society.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {society.websiteUrl}
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => openEdit(society)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(society.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSociety ? "Edit Society" : "Create Society"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Society name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Input
              placeholder="Website (https://...)"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { useAuth } from "@/contexts/AuthContext";
import { getSocieties } from "@/api/society.api";
import { Society } from "@/types/auth";

import uasplLogo from "../assets/uasplLogo.png";

/* ================= BACKEND DTO ================= */
/* Backend already returns full Society */
type SocietyDTO = Society;

export default function SelectSociety() {
  const navigate = useNavigate();
  const { user, setSociety, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [societies, setSocieties] = useState<SocietyDTO[]>([]);
  const [selectedSocietyId, setSelectedSocietyId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD SOCIETIES ================= */
  useEffect(() => {
    loadSocieties();
  }, []);

  const loadSocieties = async () => {
    try {
      const res = await getSocieties();

      /**
       * Backend returns:
       * { data: Society[] }
       */
      const list: SocietyDTO[] = Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setSocieties(list);
    } catch (err) {
      console.error("Failed to load societies", err);
      setSocieties([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACCESS CONTROL ================= */
  const assignedIds = Array.isArray(user?.assignedSocieties)
    ? user!.assignedSocieties
    : [];

  const accessibleSocieties =
    user?.role === "admin" || user?.role === "project_admin"
      ? societies
      : societies.filter((s) => assignedIds.includes(s.id)).length > 0
      ? societies.filter((s) => assignedIds.includes(s.id))
      : societies;

  /* ================= SEARCH ================= */
  const filteredSocieties = accessibleSocieties.filter((society) => {
    const query = search.toLowerCase();
    return (
      society.name.toLowerCase().includes(query) ||
      (society.address ?? "").toLowerCase().includes(query)
    );
  });

  const selectedSociety = accessibleSocieties.find(
    (s) => s.id === selectedSocietyId
  );

  /* ================= SELECT ================= */
  const handleSelectSociety = (society: SocietyDTO) => {
    setSelectedSocietyId(society.id);

    // ✅ IMPORTANT: use backend object directly
    setSociety(society);

    setOpen(false);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading societies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ================= HEADER ================= */}
      <header className="border-b border-border bg-card h-16 flex items-center">
        <div className="container mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={uasplLogo}
              alt="UASPL"
              className="h-10 w-auto object-contain"
            />
            <div>
              <div className="font-semibold">UASPL</div>
              <div className="text-xs text-muted-foreground">
                Urban Analysis & Solution
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm text-muted-foreground capitalize">
                {user?.role}
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Select Society / Project</h1>
            <p className="text-muted-foreground">
              Choose a society to continue
            </p>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full h-12 justify-between"
              >
                {selectedSociety ? (
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">
                      {selectedSociety.name}
                    </span>
                    {selectedSociety.websiteUrl ? (
                      <span className="text-xs text-blue-500">
                        {selectedSociety.websiteUrl.replace(
                          /^https?:\/\//,
                          ""
                        )}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {selectedSociety.code}
                      </span>
                    )}
                  </div>
                ) : (
                  "Select a society / project"
                )}
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[520px] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search society..."
                  value={search}
                  onValueChange={setSearch}
                />

                {filteredSocieties.length === 0 && (
                  <CommandEmpty>No society found.</CommandEmpty>
                )}

                <CommandGroup className="max-h-[400px] overflow-y-auto">
                  {filteredSocieties.map((society) => (
                    <CommandItem
                      key={society.id}
                      onSelect={() => handleSelectSociety(society)}
                    >
                      <div>
                        <div className="font-medium">{society.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {society.address}
                        </div>
                      </div>

                      <Check
                        className={`ml-auto h-4 w-4 ${
                          selectedSocietyId === society.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </main>
    </div>
  );
}

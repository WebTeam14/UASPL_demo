import { useState } from "react";
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
import { societies } from "@/data/mockData";
import { Society } from "@/types/auth";
import uasplLogo from "../assets/uasplLogo.png";

export default function SelectSociety() {
  const navigate = useNavigate();
  const { user, selectSociety, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedSocietyId, setSelectedSocietyId] = useState<string>("");
  const [search, setSearch] = useState("");

  const userSocieties = societies.filter((s) =>
    user?.assignedSocieties.includes(s.id)
  );

  const selectedSociety = userSocieties.find(
    (s) => s.id === selectedSocietyId
  );

  const filteredSocieties = userSocieties.filter((society) => {
    const query = search.toLowerCase();
    return (
      society.name.toLowerCase().includes(query) ||
      society.code.toLowerCase().includes(query) ||
      society.address.toLowerCase().includes(query)
    );
  });

  const handleSelectSociety = (society: Society) => {
    setSelectedSocietyId(society.id);
    selectSociety(society);
    setOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b border-border bg-card h-16 flex items-center">
        <div className="container mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={uasplLogo}
              alt="UASPL"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-tight">
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

      {/* MAIN */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Select Society / Project
            </h1>
            <p className="text-muted-foreground">
              Choose a society to continue
            </p>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full h-12 justify-between"
              >
                {selectedSociety ? (
                  <div className="flex flex-col items-start text-left">
                    <span className="font-semibold">
                      {selectedSociety.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {selectedSociety.code} • {selectedSociety.address}
                    </span>
                  </div>
                ) : (
                  "Select a society / project"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[520px] p-0 shadow-lg border"
              align="center"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search society..."
                  value={search}
                  onValueChange={setSearch}
                />

                {filteredSocieties.length === 0 && (
                  <CommandEmpty>No society found.</CommandEmpty>
                )}

                <CommandGroup className="max-h-[520px] overflow-y-auto">
                  {filteredSocieties.map((society) => (
                    <CommandItem
                      key={society.id}
                      onSelect={() => handleSelectSociety(society)}
                      className="px-4 py-3 cursor-pointer"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">
                          {society.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {society.code} • {society.address}
                        </span>
                      </div>

                      <Check
                        className={`ml-auto h-4 w-4 ${selectedSocietyId === society.id
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

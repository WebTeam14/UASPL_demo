import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LogOut, Check, ChevronsUpDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
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
import uasplLogo from "../assets/uaspl-logo.png";

export default function SelectSociety() {
  const navigate = useNavigate();
  const { user, selectSociety, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedSocietyId, setSelectedSocietyId] = useState("");

  const userSocieties = societies.filter((s) =>
    user?.assignedSocieties.includes(s.id)
  );

  const selectedSociety = userSocieties.find((s) => s.id === selectedSocietyId);

  const handleSelectSociety = (society: Society) => {
    setSelectedSocietyId(society.id);
    selectSociety(society);
    setOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium text-foreground">{user?.name}</div>
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

      {/* Main */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Select Society / Project
            </h1>
            <p className="text-muted-foreground">
              Choose a society to continue
            </p>
          </div>

          {/* Searchable Dropdown */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-12 text-base"
              >
                {selectedSociety ? (
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{selectedSociety.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {selectedSociety.code} • {selectedSociety.address}
                    </span>
                  </div>
                ) : (
                  "Select a society / project"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search society..." />
                <CommandEmpty>No society found.</CommandEmpty>

                <CommandGroup>
                  {userSocieties.map((society) => (
                    <CommandItem
                      key={society.id}
                      value={`${society.name} ${society.code} ${society.address}`}
                      onSelect={() => handleSelectSociety(society)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{society.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {society.code} • {society.address}
                        </span>
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

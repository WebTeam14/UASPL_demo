import uasplBuilding from "../assets/uasplBuilding.png";
import uasplLogo from "../assets/uasplLogo.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, authLoading } = useAuth();
  const { toast } = useToast();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* 🔐 REDIRECT ONLY AFTER AUTH CHECK */
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/select-society", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  /* ⏳ PREVENT BLANK SCREEN */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  const roles: { value: UserRole; label: string }[] = [
    { value: "admin", label: "Admin" },
    { value: "project admin", label: "Project Admin" },
    { value: "engineer", label: "Engineer / Planner" },
    { value: "vendor", label: "Vendor" },
    { value: "tmi", label: "TMI" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !password || !role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(userId, password, role);

      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to UASPL ERP System",
        });
        navigate("/select-society", { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or role mismatch",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${uasplBuilding})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <img src={uasplLogo} alt="UASPL" className="h-14 mx-auto mb-3" />
            <p className="text-white/70 text-xs tracking-wider">
              Urban Analysis & Solution
            </p>
            <p className="text-white/60 text-sm mt-4">
              End-to-End Solutions for Redevelopment & SRA
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-white/90">User ID</Label>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Role</Label>
              <Select
                value={role}
                onValueChange={(value: UserRole) => setRole(value)}
                disabled={isLoading}
              >
                <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2024 Urban Analysis & Solution Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}

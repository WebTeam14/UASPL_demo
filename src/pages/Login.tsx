import uasplBuilding from "../assets/uasplBuilding.png";
import uasplLogo from "../assets/uasplLogo.png";

<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
=======
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

>>>>>>> 89a3e2f (Updated UI and latest fixes)
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
<<<<<<< HEAD
=======

>>>>>>> 89a3e2f (Updated UI and latest fixes)
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();
=======
  const { login, isAuthenticated, authLoading } = useAuth();
>>>>>>> 89a3e2f (Updated UI and latest fixes)
  const { toast } = useToast();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  const roles: { value: UserRole; label: string }[] = [
    { value: "admin", label: "Admin" },
    { value: "engineer", label: "Engineer / Planner" },
    { value: "vendor", label: "Vendor" },
    { value: "tmi", label: "TMI" },
    { value: "finance", label: "Finance / HR" },
=======
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
>>>>>>> 89a3e2f (Updated UI and latest fixes)
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
<<<<<<< HEAD
        navigate("/select-society");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
=======
        navigate("/select-society", { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or role mismatch",
>>>>>>> 89a3e2f (Updated UI and latest fixes)
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
<<<<<<< HEAD
        description: "An error occurred. Please try again.",
=======
        description: "Something went wrong. Please try again.",
>>>>>>> 89a3e2f (Updated UI and latest fixes)
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
<<<<<<< HEAD
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
=======
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
>>>>>>> 89a3e2f (Updated UI and latest fixes)
        style={{ backgroundImage: `url(${uasplBuilding})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

<<<<<<< HEAD
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* LOGO SECTION (REPLACED) */}
          <div className="text-center mb-8">
            <img
              src={uasplLogo}
              alt="Urban Analysis & Solution"
              className="h-14 mx-auto object-contain mb-3"
            />
=======
      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <img src={uasplLogo} alt="UASPL" className="h-14 mx-auto mb-3" />
>>>>>>> 89a3e2f (Updated UI and latest fixes)
            <p className="text-white/70 text-xs tracking-wider">
              Urban Analysis & Solution
            </p>
            <p className="text-white/60 text-sm mt-4">
              End-to-End Solutions for Redevelopment & SRA
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
<<<<<<< HEAD
            <div className="space-y-2">
=======
            <div>
>>>>>>> 89a3e2f (Updated UI and latest fixes)
              <Label className="text-white/90">User ID</Label>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
<<<<<<< HEAD
                placeholder="Enter your user ID"
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
=======
                className="h-12 bg-white/10 border-white/20 text-white"
>>>>>>> 89a3e2f (Updated UI and latest fixes)
                disabled={isLoading}
              />
            </div>

<<<<<<< HEAD
            <div className="space-y-2">
=======
            <div>
>>>>>>> 89a3e2f (Updated UI and latest fixes)
              <Label className="text-white/90">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
                  placeholder="Enter your password"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
=======
                  className="h-12 bg-white/10 border-white/20 text-white pr-10"
>>>>>>> 89a3e2f (Updated UI and latest fixes)
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

<<<<<<< HEAD
            <div className="space-y-2">
=======
            <div>
>>>>>>> 89a3e2f (Updated UI and latest fixes)
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
<<<<<<< HEAD
              className="w-full h-12 bg-primary text-white font-semibold shadow-lg"
=======
              className="w-full h-12 bg-primary text-white font-semibold"
>>>>>>> 89a3e2f (Updated UI and latest fixes)
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
<<<<<<< HEAD
          © 2024 Urban Analysis & Solution Pvt. Ltd. All rights reserved.
=======
          © 2024 Urban Analysis & Solution Pvt. Ltd.
>>>>>>> 89a3e2f (Updated UI and latest fixes)
        </p>
      </div>
    </div>
  );
}

<<<<<<< HEAD
import { Building2 } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ variant = 'dark', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconColor = variant === 'light' ? 'text-primary-foreground' : 'text-primary';
  const textColor = variant === 'light' ? 'text-primary-foreground' : 'text-foreground';
  const subTextColor = variant === 'light' ? 'text-primary-foreground/70' : 'text-muted-foreground';

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-lg bg-primary flex items-center justify-center shadow-md`}>
        <Building2 className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-primary-foreground`} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold ${textColor} tracking-tight`}>
            UASPL
          </span>
          <span className={`text-xs ${subTextColor} -mt-1`}>
=======
import uasplLogo from "@/assets/uasplLogo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({
  variant = "dark",
  size = "md",
  showText = true,
}: LogoProps) {
  const imageSize = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  const textSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const textColor =
    variant === "light" ? "text-white" : "text-foreground";

  const subTextColor =
    variant === "light"
      ? "text-white/70"
      : "text-muted-foreground";

  return (
    <div className="flex items-center gap-3">
      {/* ✅ LOGO IMAGE */}
      <img
        src={uasplLogo}
        alt="UASPL"
        className={cn(
          imageSize[size],
          "w-auto object-contain"
        )}
      />

      {/* ✅ TEXT */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              textSize[size],
              "font-bold tracking-tight",
              textColor
            )}
          >
            UASPL
          </span>
          <span className={cn("text-xs -mt-1", subTextColor)}>
>>>>>>> 89a3e2f (Updated UI and latest fixes)
            Urban Analysis & Solution
          </span>
        </div>
      )}
    </div>
  );
}

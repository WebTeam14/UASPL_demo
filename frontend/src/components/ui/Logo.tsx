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
            Urban Analysis & Solution
          </span>
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import StarBorder from "./StarBorder";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <StarBorder 
        color="#06B6D4" // Bright cyan for visibility
        speed="6s" 
        thickness={3}
        className={cn(
          hoverEffect && "transition-transform duration-300 hover:-translate-y-1"
        )}
      >
        <div
          ref={ref}
          className={cn(
            "relative w-full h-full overflow-hidden rounded-[15px] bg-white/5 p-6 backdrop-blur-md",
            "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
            hoverEffect &&
              "transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StarBorder>
    );
  }
);

GlassCard.displayName = "GlassCard";

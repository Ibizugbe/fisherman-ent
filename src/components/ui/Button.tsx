// src/components/ui/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";

function cn(
  ...args: Array<string | Record<string, boolean> | undefined | null>
) {
  return args
    .flatMap((arg) => {
      if (!arg) return [];
      if (typeof arg === "string") return [arg];
      return Object.entries(arg)
        .filter(([, v]) => v)
        .map(([k]) => k);
    })
    .join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          // Variants
          {
            "bg-[#739AD4] text-white hover:bg-blue-700 shadow-lg":
              variant === "default",
            "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50":
              variant === "outline",
            "text-blue-600 hover:bg-blue-50": variant === "ghost",
          },
          // Sizes
          {
            "h-12 px-8 text-lg": size === "lg",
            "h-10 px-6 text-base": size === "default",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

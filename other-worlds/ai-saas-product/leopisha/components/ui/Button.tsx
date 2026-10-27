"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium relative overflow-hidden " +
      "transition-all duration-200 ease-out-expo " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none " +
      "active:scale-[0.99]";

    const variants = {
      primary:
        "bg-accent text-on-accent shadow-sm border border-accent/70 " +
        "hover:bg-accent/92 hover:shadow-md",
      secondary:
        "bg-primary text-on-primary shadow-sm border border-primary/70 " +
        "hover:bg-primary/94 hover:shadow-md",
      ghost:
        "bg-transparent text-foreground " +
        "hover:bg-muted/55 active:bg-muted/80",
      destructive:
        "bg-destructive text-on-destructive shadow-sm border border-destructive/70 " +
        "hover:bg-destructive/94 hover:shadow-md",
      outline:
        "border border-border bg-transparent text-foreground shadow-none " +
        "hover:border-accent/45 hover:bg-accent/5 hover:text-foreground",
      glass:
        "glass text-foreground shadow-sm border border-border/60 " +
        "hover:bg-card/95 hover:shadow-md",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-5 py-3 text-[0.95rem] rounded-xl",
      lg: "px-7 py-3.5 text-base rounded-xl",
      xl: "px-8 py-4 text-lg rounded-[1rem]",
    };

    const width = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], width, className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="flex items-center justify-center" aria-hidden="true">
            <svg
              className="h-4 w-4 animate-spin sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span className={cn("relative z-10", loading ? "opacity-0" : "opacity-100")}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "glass" | "subtle";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hover = false,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-card border border-border shadow-sm",
      bordered: "bg-card border border-border/50 shadow-sm",
      elevated: "bg-card shadow-xl border-none",
      glass: "glass shadow-md",
      subtle: "bg-card border border-border-soft shadow-xs",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const hoverStyles = hover
      ? "transition-all duration-400 ease-out-expo hover:shadow-xl hover:-translate-y-1 hover:border-accent/30"
      : "";

    const interactiveStyles = interactive
      ? "transition-all duration-300 ease-out-expo hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variants[variant],
          paddings[padding],
          hoverStyles,
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mb-5", className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading font-medium text-foreground tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm leading-relaxed mt-1.5", className)}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center mt-6 pt-5 border-t border-border-soft", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card };
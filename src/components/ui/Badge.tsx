import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-tertiary text-text-secondary",
  brand: "bg-brand-muted text-brand-light",
  outline: "border border-border text-text-secondary",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

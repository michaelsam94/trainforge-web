import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-400 text-white hover:bg-brand-600 active:scale-[0.97] disabled:opacity-60",
  secondary:
    "border border-border bg-transparent text-foreground hover:bg-card active:scale-[0.97]",
  ghost: "bg-transparent text-foreground hover:bg-card active:scale-[0.97]",
  destructive:
    "bg-error text-white hover:opacity-90 active:scale-[0.97] disabled:opacity-60",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm rounded-[var(--radius-sm)]",
  md: "min-h-12 px-6 text-base rounded-[var(--radius-full)]",
  lg: "min-h-14 px-8 text-lg rounded-[var(--radius-full)]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-medium transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:pointer-events-none";

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}

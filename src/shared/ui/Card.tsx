import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-card p-4",
        interactive &&
          "transition-transform duration-200 active:scale-[0.98] cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

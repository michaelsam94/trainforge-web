import { cn } from "@/shared/lib/cn";

export type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-border/60",
        className,
      )}
      aria-hidden
    />
  );
}

export function PlanDaySkeleton() {
  return (
    <div className="flex w-40 flex-col gap-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-24 w-full rounded-[var(--radius-lg)]" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

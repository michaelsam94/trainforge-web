import { cn } from "@/shared/lib/cn";
import type { Badge } from "@/features/progress-tracking/types";

type BadgeShelfProps = {
  badges: Badge[];
  className?: string;
  emptyMessage?: string;
};

export function BadgeShelf({
  badges,
  className,
  emptyMessage = "Complete workouts to unlock badges.",
}: BadgeShelfProps) {
  const earned = badges.filter((badge) => badge.earned);

  if (earned.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className={cn("shelf touch-pan-x", className)} aria-label="Earned badges">
      {earned.map((badge) => (
        <li
          key={badge.id}
          title={badge.description}
          className="rounded-[var(--radius-xs)] bg-brand-50 px-3 py-2 text-sm font-medium text-brand-900 dark:bg-brand-900/30 dark:text-brand-100"
        >
          {badge.title}
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Clock, Dumbbell } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Card } from "@/shared/ui";
import type { PlanDay } from "@/features/plan-generator/types";

type PlanDayCardProps = {
  day: PlanDay;
  active?: boolean;
};

export function PlanDayCard({ day, active = false }: PlanDayCardProps) {
  const dateLabel = format(parseISO(day.scheduledDate), "EEE d MMM");

  return (
    <Link href={`/plan/${day.id}`} className="block w-44 shrink-0 snap-start">
      <Card
        interactive
        className={cn(
          "h-full min-h-36",
          active && "border-brand-400 ring-1 ring-brand-400/30",
        )}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{dateLabel}</p>
        <h2 className="mt-2 line-clamp-2 font-display text-base font-bold leading-tight">
          {day.title}
        </h2>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden />
            {day.estimatedMinutes}m
          </span>
          <span className="inline-flex items-center gap-1">
            <Dumbbell size={14} aria-hidden />
            {day.exerciseCount}
          </span>
        </div>
      </Card>
    </Link>
  );
}

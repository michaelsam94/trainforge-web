import { Card, ProgressRing, Skeleton } from "@/shared/ui";
import { BadgeShelf } from "@/features/progress-tracking/components/BadgeShelf";
import { SkillRadarChart } from "@/features/progress-tracking/components/SkillRadarChart";
import { VolumeChart } from "@/features/progress-tracking/components/VolumeChart";
import { WorkoutHistoryList } from "@/features/progress-tracking/components/WorkoutHistoryList";
import type { Badge, ProgressSummary, WorkoutHistoryItem } from "@/features/progress-tracking/types";

type ProgressDashboardViewProps = {
  summary: ProgressSummary | null;
  history: WorkoutHistoryItem[];
  badges: Badge[];
  isLoading: boolean;
  isHistoryLoading: boolean;
};

export function ProgressDashboardView({
  summary,
  history,
  badges,
  isLoading,
  isHistoryLoading,
}: ProgressDashboardViewProps) {
  if (isLoading || !summary) {
    return (
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-[var(--radius-md)]" />
        <Skeleton className="h-64 rounded-[var(--radius-md)]" />
      </div>
    );
  }

  const { adherence, totals, weeklyVolume, skillRadar, streaks } = summary;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section aria-labelledby="progress-overview-heading" className="space-y-6">
        <Card className="flex flex-col items-center gap-4 p-6">
          <h2 id="progress-overview-heading" className="sr-only">
            Weekly overview
          </h2>
          <ProgressRing
            value={adherence.completed}
            max={adherence.target}
            label={`Weekly adherence ${String(adherence.percent)} percent`}
          />
          <p className="text-sm text-muted">
            {adherence.completed} of {adherence.target} planned workouts completed this week
          </p>
          <div className="grid w-full grid-cols-3 gap-3 text-center text-sm">
            <div>
              <p className="text-muted">Workouts</p>
              <p className="text-lg font-bold text-foreground">{totals.workouts}</p>
            </div>
            <div>
              <p className="text-muted">Sets</p>
              <p className="text-lg font-bold text-foreground">{totals.sets}</p>
            </div>
            <div>
              <p className="text-muted">Volume (kg)</p>
              <p className="text-lg font-bold text-foreground">{totals.volumeKg}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Streaks</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-sm)] bg-brand-50 px-4 py-3 dark:bg-brand-900/20">
              <p className="text-sm text-muted">Current</p>
              <p className="text-2xl font-bold text-foreground">{streaks.currentStreak} days</p>
            </div>
            <div className="rounded-[var(--radius-sm)] bg-card px-4 py-3 ring-1 ring-[var(--border)]">
              <p className="text-sm text-muted">Longest</p>
              <p className="text-2xl font-bold text-foreground">{streaks.longestStreak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Skill radar</h2>
          <div className="mt-2">
            <SkillRadarChart skillRadar={skillRadar} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Badges</h2>
          <div className="mt-4">
            <BadgeShelf badges={badges} />
          </div>
        </Card>
      </section>

      <section aria-labelledby="progress-analytics-heading" className="space-y-6">
        <Card className="p-6">
          <h2 id="progress-analytics-heading" className="font-display text-lg font-bold">
            Weekly volume
          </h2>
          <div className="mt-4">
            <VolumeChart weeklyVolume={weeklyVolume} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Workout history</h2>
          <div className="mt-4">
            {isHistoryLoading ? (
              <Skeleton className="h-40 rounded-[var(--radius-md)]" />
            ) : (
              <WorkoutHistoryList items={history} />
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

"use client";

import { ProgressDashboardView } from "@/features/progress-tracking/components/ProgressDashboardView";
import {
  useBadges,
  useProgressSummary,
  useWorkoutHistory,
} from "@/features/progress-tracking/hooks/useProgress";

export function ProgressDashboardContainer() {
  const summaryQuery = useProgressSummary();
  const historyQuery = useWorkoutHistory(50);
  const badgesQuery = useBadges();

  return (
    <ProgressDashboardView
      summary={summaryQuery.data ?? null}
      history={historyQuery.data?.items ?? []}
      badges={badgesQuery.data?.badges ?? []}
      isLoading={summaryQuery.isLoading}
      isHistoryLoading={historyQuery.isLoading}
    />
  );
}

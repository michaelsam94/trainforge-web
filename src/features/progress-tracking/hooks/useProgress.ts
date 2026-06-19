import { useQuery } from "@tanstack/react-query";
import {
  fetchBadges,
  fetchProgressSummary,
  fetchWorkoutHistory,
} from "@/features/progress-tracking/api/progressApi";

export const progressSummaryQueryKey = ["progress", "summary"] as const;
export const workoutHistoryQueryKey = ["progress", "history"] as const;
export const badgesQueryKey = ["badges"] as const;

export function useProgressSummary() {
  return useQuery({
    queryKey: progressSummaryQueryKey,
    queryFn: fetchProgressSummary,
  });
}

export function useWorkoutHistory(limit = 50) {
  return useQuery({
    queryKey: [...workoutHistoryQueryKey, limit],
    queryFn: () => fetchWorkoutHistory(limit),
  });
}

export function useBadges() {
  return useQuery({
    queryKey: badgesQueryKey,
    queryFn: fetchBadges,
  });
}

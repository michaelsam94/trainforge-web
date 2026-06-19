import { apiClient } from "@/shared/lib/apiClient";
import type {
  BadgesResponse,
  ProgressSummary,
  StreakResult,
  WorkoutHistoryResponse,
} from "@/features/progress-tracking/types";

export async function fetchProgressSummary(): Promise<ProgressSummary> {
  return apiClient.get<ProgressSummary>("/progress/summary");
}

export async function fetchStreaks(): Promise<StreakResult> {
  return apiClient.get<StreakResult>("/progress/streaks");
}

export async function fetchWorkoutHistory(
  limit = 50,
  offset = 0,
): Promise<WorkoutHistoryResponse> {
  const query = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  return apiClient.get<WorkoutHistoryResponse>(`/progress/history?${query.toString()}`);
}

export async function fetchBadges(): Promise<BadgesResponse> {
  return apiClient.get<BadgesResponse>("/badges");
}

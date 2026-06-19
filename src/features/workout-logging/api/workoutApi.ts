import { apiClient } from "@/shared/lib/apiClient";
import type {
  AdaptPlanPayload,
  AdaptPlanResponse,
  AdherenceResponse,
  CompleteWorkoutPayload,
  LogSetPayload,
  WorkoutLogDto,
} from "@/features/workout-logging/types";

export async function logWorkoutSet(payload: LogSetPayload): Promise<{ workout: WorkoutLogDto }> {
  return apiClient.post<{ workout: WorkoutLogDto }>("/workouts/log", payload);
}

export async function completeWorkout(
  payload: CompleteWorkoutPayload,
): Promise<{ workout: WorkoutLogDto }> {
  return apiClient.post<{ workout: WorkoutLogDto }>("/workouts/complete", payload);
}

export async function adaptCurrentPlan(
  payload: AdaptPlanPayload,
): Promise<AdaptPlanResponse> {
  return apiClient.patch<AdaptPlanResponse>("/plans/current/adapt", payload);
}

export async function fetchWorkoutAdherence(weekStart?: string): Promise<AdherenceResponse> {
  const query = weekStart ? `?weekStart=${encodeURIComponent(weekStart)}` : "";
  return apiClient.get<AdherenceResponse>(`/workouts/adherence${query}`);
}

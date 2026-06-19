import { apiClient } from "@/shared/lib/apiClient";
import type {
  BuildPlanRequest,
  BuildPlanResponse,
  CurrentPlanResponse,
  GeneratePlanResponse,
  PlanResponse,
  TrainingPlan,
  WeekPlanResponse,
} from "@/features/plan-generator/types";

export async function fetchCurrentPlan(): Promise<CurrentPlanResponse> {
  return apiClient.get<CurrentPlanResponse>("/plans/current");
}

export async function fetchCurrentWeekPlan(): Promise<WeekPlanResponse> {
  return apiClient.get<WeekPlanResponse>("/plans/current/week");
}

export function mergeWeekPlanIntoTrainingPlan(
  plan: TrainingPlan,
  week: WeekPlanResponse["plan"],
): TrainingPlan {
  if (!week) return plan;

  return {
    ...plan,
    id: week.id,
    status: week.status,
    weekStart: week.weekStart,
    days: week.days.map((day) => ({
      ...day,
      exerciseCount: day.exercises.length,
    })),
  };
}

export async function buildManualPlan(body: BuildPlanRequest): Promise<BuildPlanResponse> {
  return apiClient.post<BuildPlanResponse>("/plans/build", body);
}

export async function generatePlan(): Promise<GeneratePlanResponse> {
  return apiClient.post<GeneratePlanResponse>("/plans/generate");
}

export async function fetchPlanById(planId: string): Promise<PlanResponse> {
  return apiClient.get<PlanResponse>(`/plans/${planId}`);
}

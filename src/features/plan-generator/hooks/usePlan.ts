"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  buildManualPlan,
  fetchCurrentPlan,
  fetchCurrentWeekPlan,
  generatePlan,
  fetchPlanById,
  mergeWeekPlanIntoTrainingPlan,
  resetCurrentPlan,
} from "@/features/plan-generator/api/planApi";
import type { BuildPlanRequest, TrainingPlan } from "@/features/plan-generator/types";

export const planQueryKey = ["plan", "current"] as const;

function isGenerating(plan: TrainingPlan | null | undefined): boolean {
  return plan?.status === "generating";
}

export function usePlan(options?: { pollWhileGenerating?: boolean }) {
  return useQuery({
    queryKey: planQueryKey,
    queryFn: async () => {
      const [fullResponse, weekResponse] = await Promise.all([
        fetchCurrentPlan(),
        fetchCurrentWeekPlan().catch(() => ({ plan: null })),
      ]);

      if (!fullResponse.plan) return null;
      if (weekResponse.plan) {
        return mergeWeekPlanIntoTrainingPlan(fullResponse.plan, weekResponse.plan);
      }
      return fullResponse.plan;
    },
    refetchInterval: (query) =>
      options?.pollWhileGenerating !== false && isGenerating(query.state.data)
        ? 2000
        : false,
  });
}

export function usePlanById(planId: string | undefined) {
  return useQuery({
    queryKey: ["plan", planId],
    queryFn: async () => {
      if (!planId) throw new Error("Missing plan id");
      const response = await fetchPlanById(planId);
      return response.plan;
    },
    enabled: Boolean(planId),
  });
}

export function useResetPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetCurrentPlan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: planQueryKey });
    },
  });
}

export function useBuildManualPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BuildPlanRequest) => buildManualPlan(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: planQueryKey });
    },
  });
}

export function useGeneratePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generatePlan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: planQueryKey });
    },
  });
}

export function usePlanDay(planDayId: string) {
  const planQuery = usePlan();

  const day = planQuery.data?.days.find((item) => item.id === planDayId) ?? null;

  return {
    ...planQuery,
    day,
    plan: planQuery.data ?? null,
  };
}

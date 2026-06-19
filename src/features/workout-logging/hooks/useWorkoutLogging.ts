"use client";

import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/shared/lib/apiClient";
import {
  adaptCurrentPlan,
  completeWorkout,
  fetchWorkoutAdherence,
  logWorkoutSet,
} from "@/features/workout-logging/api/workoutApi";
import type { LogSetPayload } from "@/features/workout-logging/types";
import { planQueryKey } from "@/features/plan-generator/hooks/usePlan";
import { useWorkoutSessionStore } from "@/features/workout-logging/store/workoutSessionStore";
import { enqueueOfflineEntry } from "@/features/offline-sync/lib/offlineQueue";
import { notifyOfflineQueueChanged } from "@/features/offline-sync/hooks/useOfflineSync";
import { useToast } from "@/shared/ui";

function createIdempotencyKey(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function useWorkoutAdherence(weekStart?: string) {
  return useQuery({
    queryKey: ["workouts", "adherence", weekStart ?? "current"],
    queryFn: () => fetchWorkoutAdherence(weekStart),
  });
}

export function useLogSetMutation() {
  const queryClient = useQueryClient();
  const addLoggedSet = useWorkoutSessionStore((state) => state.addLoggedSet);
  const setWorkoutLogId = useWorkoutSessionStore((state) => state.setWorkoutLogId);

  return useMutation({
    mutationFn: (payload: LogSetPayload) => logWorkoutSet(payload),
    onMutate: async (payload) => {
      const optimisticSet = {
        exerciseId: payload.exerciseId,
        setNumber: payload.setNumber,
        reps: payload.reps,
        weightKg: payload.weightKg,
        durationSeconds: payload.durationSeconds,
        completed: true,
      };
      addLoggedSet(optimisticSet);
      return { optimisticSet };
    },
    onSuccess: (data) => {
      setWorkoutLogId(data.workout.id);
      void queryClient.invalidateQueries({ queryKey: planQueryKey });
    },
    onError: (error, payload, context) => {
      if (error instanceof ApiError && error.isNetworkError) {
        enqueueOfflineEntry({
          clientId: payload.idempotencyKey,
          kind: "log_set",
          payload,
        });
        notifyOfflineQueueChanged();
        return;
      }

      if (!context) return;
      const currentSets = useWorkoutSessionStore.getState().loggedSets;
      useWorkoutSessionStore.getState().syncLoggedSets(
        currentSets.filter(
          (setItem) =>
            !(
              setItem.exerciseId === payload.exerciseId &&
              setItem.setNumber === payload.setNumber
            ),
        ),
      );
    },
  });
}

export function useCompleteWorkoutMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const endSession = useWorkoutSessionStore((state) => state.endSession);
  const pendingIdempotencyKey = useRef<string | null>(null);

  return useMutation({
    onMutate: () => {
      pendingIdempotencyKey.current = createIdempotencyKey("complete");
    },
    mutationFn: (input: { workoutLogId: string; difficultyRating: number }) =>
      completeWorkout({
        workoutLogId: input.workoutLogId,
        difficultyRating: input.difficultyRating,
        idempotencyKey: pendingIdempotencyKey.current ?? createIdempotencyKey("complete"),
      }),
    onSuccess: async (data) => {
      try {
        const adaptation = await adaptCurrentPlan({ workoutLogId: data.workout.id });
        toast(adaptation.adaptation.reason, "success");
        if (adaptation.plan) {
          queryClient.setQueryData(planQueryKey, adaptation.plan);
        }
      } catch (error) {
        const message =
          error instanceof ApiError ? error.message : "Workout saved, but plan adaptation failed.";
        toast(message, "warning");
      }

      endSession();
      await queryClient.invalidateQueries({ queryKey: planQueryKey });
      await queryClient.invalidateQueries({ queryKey: ["workouts", "adherence"] });
    },
    onError: (error, input) => {
      if (error instanceof ApiError && error.isNetworkError) {
        const idempotencyKey =
          pendingIdempotencyKey.current ?? createIdempotencyKey("complete-offline");
        enqueueOfflineEntry({
          clientId: idempotencyKey,
          kind: "complete_workout",
          payload: {
            workoutLogId: "",
            difficultyRating: input.difficultyRating,
            idempotencyKey,
          },
        });
        notifyOfflineQueueChanged();
        endSession();
        toast("Workout saved offline — will sync when you reconnect.", "success");
        return;
      }

      toast(
        error instanceof ApiError ? error.message : "Could not complete workout.",
        "error",
      );
    },
  });
}

export function useAdaptPlanMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: adaptCurrentPlan,
    onSuccess: (data) => {
      toast(data.adaptation.reason, "success");
      if (data.plan) {
        queryClient.setQueryData(planQueryKey, data.plan);
      }
    },
  });
}

export type WorkoutStatus = "in_progress" | "completed";

export type LoggedSet = {
  exerciseId: string;
  setNumber: number;
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  completed: boolean;
};

export type WorkoutLogDto = {
  id: string;
  planId: string;
  planDayId: string;
  status: WorkoutStatus;
  difficultyRating?: number;
  startedAt: string;
  completedAt?: string;
  sets: Array<LoggedSet & { id: string; loggedAt: string }>;
};

export type LogSetPayload = {
  planDayId: string;
  exerciseId: string;
  setNumber: number;
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  idempotencyKey: string;
};

export type CompleteWorkoutPayload = {
  workoutLogId: string;
  difficultyRating: number;
  idempotencyKey: string;
};

export type AdaptPlanPayload = {
  workoutLogId: string;
};

export type AdaptPlanResponse = {
  adaptation: {
    id: string;
    planId: string;
    reason: string;
    loadMultiplier: number;
    createdAt: string;
  };
  plan: import("@/features/plan-generator/types").TrainingPlan | null;
};

export type AdherenceResponse = {
  completed: number;
  target: number;
};

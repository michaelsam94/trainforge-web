export type PlanStatus = "generating" | "ready" | "failed";

export type PlanExercise = {
  id: string;
  name: string;
  sets?: number;
  reps?: string;
  durationSeconds?: number;
  notes?: string;
};

export type PlanDay = {
  id: string;
  dayIndex: number;
  scheduledDate: string;
  title: string;
  focus?: string;
  estimatedMinutes: number;
  exerciseCount: number;
  exercises: PlanExercise[];
};

export type TrainingPlan = {
  id: string;
  status: PlanStatus;
  weekStart: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  days: PlanDay[];
};

export type BuildPlanResponse = {
  planId: string;
  status: PlanStatus;
};

export type BuildPlanRequest = {
  mode: "catalog" | "body_parts";
  bodyParts?: string[];
};

export type CurrentPlanResponse = {
  plan: TrainingPlan | null;
};

export type GeneratePlanResponse = {
  planId: string;
  status: PlanStatus;
};

export type PlanResponse = {
  plan: TrainingPlan;
};

export type WeekPlan = {
  id: string;
  status: PlanStatus;
  weekStart: string;
  days: Array<
    Omit<PlanDay, "focus" | "exerciseCount"> & {
      exercises: Array<Pick<PlanExercise, "id" | "name" | "sets" | "reps" | "durationSeconds">>;
    }
  >;
};

export type WeekPlanResponse = {
  plan: WeekPlan | null;
};

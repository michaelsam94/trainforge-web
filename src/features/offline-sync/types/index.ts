import type {
  CompleteWorkoutPayload,
  LogSetPayload,
} from "@/features/workout-logging/types";

export type OfflineSyncKind = "log_set" | "complete_workout";

export type OfflineSyncEntry = {
  clientId: string;
  kind: OfflineSyncKind;
  payload: LogSetPayload | CompleteWorkoutPayload;
};

export type OfflineSyncResultItem = {
  clientId: string;
  ok: boolean;
  workoutLogId?: string;
  error?: string;
};

export type OfflineSyncResponse = {
  results: OfflineSyncResultItem[];
};

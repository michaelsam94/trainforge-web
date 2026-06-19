import { create } from "zustand";
import type { LoggedSet } from "@/features/workout-logging/types";

type WorkoutSessionState = {
  planDayId: string | null;
  workoutLogId: string | null;
  currentExerciseIndex: number;
  reps: number;
  loggedSets: LoggedSet[];
  isActive: boolean;
  startSession: (planDayId: string) => void;
  setWorkoutLogId: (workoutLogId: string) => void;
  setCurrentExerciseIndex: (index: number) => void;
  setReps: (reps: number) => void;
  incrementReps: () => void;
  decrementReps: () => void;
  addLoggedSet: (set: LoggedSet) => void;
  syncLoggedSets: (sets: LoggedSet[]) => void;
  endSession: () => void;
};

export const useWorkoutSessionStore = create<WorkoutSessionState>((set, get) => ({
  planDayId: null,
  workoutLogId: null,
  currentExerciseIndex: 0,
  reps: 10,
  loggedSets: [],
  isActive: false,

  startSession: (planDayId) =>
    set({
      planDayId,
      workoutLogId: null,
      currentExerciseIndex: 0,
      reps: 10,
      loggedSets: [],
      isActive: true,
    }),

  setWorkoutLogId: (workoutLogId) => set({ workoutLogId }),

  setCurrentExerciseIndex: (index) => set({ currentExerciseIndex: index, reps: 10 }),

  setReps: (reps) => set({ reps: Math.max(0, reps) }),

  incrementReps: () => set({ reps: get().reps + 1 }),

  decrementReps: () => set({ reps: Math.max(0, get().reps - 1) }),

  addLoggedSet: (loggedSet) =>
    set((state) => {
      const withoutDuplicate = state.loggedSets.filter(
        (setItem) =>
          !(
            setItem.exerciseId === loggedSet.exerciseId &&
            setItem.setNumber === loggedSet.setNumber
          ),
      );
      return { loggedSets: [...withoutDuplicate, loggedSet] };
    }),

  syncLoggedSets: (sets) => set({ loggedSets: sets }),

  endSession: () =>
    set({
      planDayId: null,
      workoutLogId: null,
      currentExerciseIndex: 0,
      reps: 10,
      loggedSets: [],
      isActive: false,
    }),
}));

"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import type { PlanDay } from "@/features/plan-generator/types";
import {
  useCompleteWorkoutMutation,
  useLogSetMutation,
} from "@/features/workout-logging/hooks/useWorkoutLogging";
import { useWorkoutSessionStore } from "@/features/workout-logging/store/workoutSessionStore";
import { ExerciseStepCarousel } from "@/features/workout-logging/components/ExerciseStepCarousel";

type WorkoutSessionViewProps = {
  day: PlanDay;
  onExit: () => void;
};

export function WorkoutSessionView({ day, onExit }: WorkoutSessionViewProps) {
  const {
    currentExerciseIndex,
    reps,
    loggedSets,
    workoutLogId,
    incrementReps,
    decrementReps,
    setCurrentExerciseIndex,
  } = useWorkoutSessionStore();

  const logSet = useLogSetMutation();
  const completeWorkout = useCompleteWorkoutMutation();

  const exercise = day.exercises[currentExerciseIndex];
  if (!exercise) return null;

  const prescribedSets = exercise.sets ?? 1;
  const completedForExercise = loggedSets.filter(
    (set) => set.exerciseId === exercise.id && set.completed,
  ).length;
  const nextSetNumber = completedForExercise + 1;
  const isExerciseComplete = completedForExercise >= prescribedSets;

  const handleLogSet = async () => {
    await logSet.mutateAsync({
      planDayId: day.id,
      exerciseId: exercise.id,
      setNumber: nextSetNumber,
      reps: exercise.reps ? reps : undefined,
      durationSeconds: exercise.durationSeconds,
      idempotencyKey: `set-${day.id}-${exercise.id}-${String(nextSetNumber)}`,
    });

    if (isExerciseComplete || nextSetNumber >= prescribedSets) {
      if (currentExerciseIndex < day.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
  };

  const handleComplete = async (difficultyRating: number) => {
    if (!workoutLogId) return;
    await completeWorkout.mutateAsync({ workoutLogId, difficultyRating });
    onExit();
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 safe-bottom">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border"
          aria-label="Exit workout"
        >
          <X size={20} aria-hidden />
        </button>
        <div className="text-center">
          <p className="text-xs text-muted">
            Exercise {currentExerciseIndex + 1} of {day.exercises.length}
          </p>
          <p className="font-display text-sm font-bold">{exercise.name}</p>
        </div>
        <span className="min-w-11 text-right text-sm text-muted">
          Set {Math.min(nextSetNumber, prescribedSets)}/{prescribedSets}
        </span>
      </header>

      <ExerciseStepCarousel
        exercises={day.exercises}
        currentIndex={currentExerciseIndex}
        onSelect={setCurrentExerciseIndex}
      />

      <div className="flex flex-1 flex-col items-center justify-center px-4">
        {exercise.reps ? (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={decrementReps}
              className="inline-flex size-14 items-center justify-center rounded-full border border-border bg-card text-2xl font-bold active:scale-[0.97]"
              aria-label="Decrease reps"
            >
              <Minus size={24} aria-hidden />
            </button>
            <div className="text-center">
              <p className="text-sm text-muted">Reps</p>
              <p className="font-display text-5xl font-bold">{reps}</p>
            </div>
            <button
              type="button"
              onClick={incrementReps}
              className="inline-flex size-14 items-center justify-center rounded-full border border-border bg-card text-2xl font-bold active:scale-[0.97]"
              aria-label="Increase reps"
            >
              <Plus size={24} aria-hidden />
            </button>
          </div>
        ) : (
          <p className="text-center text-muted">
            Target: {exercise.durationSeconds ? `${String(exercise.durationSeconds)} seconds` : "Complete set"}
          </p>
        )}
      </div>

      <footer className="border-t border-border px-4 py-4 safe-bottom">
        <Button
          type="button"
          className="w-full"
          loading={logSet.isPending}
          disabled={isExerciseComplete && currentExerciseIndex >= day.exercises.length - 1}
          onClick={() => {
            void handleLogSet();
          }}
        >
          Log set {nextSetNumber}
        </Button>

        {workoutLogId ? (
          <div className="mt-4">
            <p className="mb-2 text-center text-sm text-muted">How hard was that session?</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  disabled={completeWorkout.isPending}
                  onClick={() => {
                    void handleComplete(rating);
                  }}
                  className={cn(
                    "min-h-12 rounded-[var(--radius-sm)] border border-border text-sm font-medium active:scale-[0.97]",
                    rating >= 4 ? "text-warning" : "text-foreground",
                  )}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <Link href="/plan" className="mt-4 block text-center text-sm text-muted">
          Save and exit
        </Link>
      </footer>
    </div>
  );
}

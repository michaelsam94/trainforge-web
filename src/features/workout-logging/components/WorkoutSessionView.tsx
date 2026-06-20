"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
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

const MAX_LOGGABLE_SETS = 5;

function normalizeSetCount(value: number | undefined): number {
  if (!Number.isFinite(value) || value == null) return 1;
  return Math.min(MAX_LOGGABLE_SETS, Math.max(1, Math.trunc(value)));
}

type WorkoutExerciseDetails = {
  imageUrl?: string | null;
  instructions?: string[];
  equipments?: string[];
  muscleGroup?: string | null;
  difficulty?: string | null;
};

type WorkoutSessionViewProps = {
  day: PlanDay;
  onExit: () => void;
};

export function WorkoutSessionView({ day, onExit }: WorkoutSessionViewProps) {
  const {
    currentExerciseIndex,
    reps,
    loggedSets,
    addLoggedSet,
    workoutLogId,
    incrementReps,
    decrementReps,
    setCurrentExerciseIndex,
  } = useWorkoutSessionStore();

  const logSet = useLogSetMutation();
  const completeWorkout = useCompleteWorkoutMutation();
  const [isFinished, setIsFinished] = useState(false);

  const exercise = day.exercises[currentExerciseIndex];
  if (!exercise) return null;

  const exerciseDetails = exercise as typeof exercise & WorkoutExerciseDetails;
  const exerciseMeta = [exerciseDetails.muscleGroup, exerciseDetails.difficulty, ...(exerciseDetails.equipments ?? [])].filter(Boolean);

  const prescribedSets = normalizeSetCount(exercise.sets);
  const completedForExercise = loggedSets.filter(
    (set) => set.exerciseId === exercise.id && set.completed,
  ).length;
  const nextSetNumber = completedForExercise + 1;
  const isExerciseComplete = completedForExercise >= prescribedSets;

  const handleLogSet = async () => {
    const shouldAdvanceExercise =
      nextSetNumber >= prescribedSets && currentExerciseIndex < day.exercises.length - 1;

    await logSet.mutateAsync({
      planDayId: day.id,
      exerciseId: exercise.id,
      setNumber: nextSetNumber,
      reps: exercise.reps ? reps : undefined,
      durationSeconds: exercise.durationSeconds,
      idempotencyKey: `set-${day.id}-${exercise.id}-${String(nextSetNumber)}`,
    });

    addLoggedSet({
      exerciseId: exercise.id,
      setNumber: nextSetNumber,
      reps,
      durationSeconds: exercise.durationSeconds,
      completed: true,
    });

    if (shouldAdvanceExercise) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }

  };

  const handleComplete = async (difficultyRating: number) => {
    if (!workoutLogId) return;
    await completeWorkout.mutateAsync({ workoutLogId, difficultyRating });
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="px-4 py-4">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <p className="text-sm font-semibold text-foreground">Workout complete</p>
          <p className="mt-1 text-sm text-muted-foreground">Your session is saved. Nice work.</p>
          <Button type="button" className="mt-4" onClick={onExit}>
            Back to exercises
          </Button>
        </div>
      </div>
    );
  }

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
          <div className="text-center text-muted">
            {exerciseDetails.imageUrl ? (
              <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface">
                <img
                  src={exerciseDetails.imageUrl}
                  alt={`${exercise.name} demonstration`}
                  className="aspect-video w-full object-cover"
                />
              </div>
            ) : null}

            {exerciseMeta.length ? (
              <p className="mt-3 text-sm text-muted-foreground">{exerciseMeta.join(" • ")}</p>
            ) : null}

            {exerciseDetails.instructions?.length ? (
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {exerciseDetails.instructions.slice(0, 3).map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            ) : null}

            <p>Target: {exercise.durationSeconds ? `${String(exercise.durationSeconds)} seconds` : "Complete set"}</p>
          </div>
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

"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Clock, Play } from "lucide-react";
import { usePlanDay } from "@/features/plan-generator/hooks/usePlan";
import { WorkoutSessionView } from "@/features/workout-logging/components/WorkoutSessionView";
import { useWorkoutSessionStore } from "@/features/workout-logging/store/workoutSessionStore";
import { Button, Card, PlanDaySkeleton, Skeleton } from "@/shared/ui";

type PlanDayWorkoutContainerProps = {
  dayId: string;
};

export function PlanDayWorkoutContainer({ dayId }: PlanDayWorkoutContainerProps) {
  const { day, plan, isLoading, data } = usePlanDay(dayId);
  const isGenerating = data?.status === "generating";
  const { isActive, startSession, endSession } = useWorkoutSessionStore();

  if (isLoading || isGenerating) {
    return (
      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <Skeleton className="mb-6 h-6 w-32" />
        <PlanDaySkeleton />
      </main>
    );
  }

  if (!day || !plan) {
    return (
      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <Link href="/plan" className="inline-flex items-center gap-2 text-sm text-brand-600">
          <ArrowLeft size={16} aria-hidden />
          Back to plan
        </Link>
        <p className="mt-8 text-muted">Workout not found.</p>
      </main>
    );
  }

  if (isActive) {
    return (
      <WorkoutSessionView
        day={day}
        onExit={() => {
          endSession();
        }}
      />
    );
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <Link href="/plan" className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-600">
        <ArrowLeft size={16} aria-hidden />
        Back to plan
      </Link>

      <p className="mt-6 text-sm text-muted">
        {format(parseISO(day.scheduledDate), "EEEE, MMM d")}
      </p>
      <h1 className="font-display text-2xl font-bold">{day.title}</h1>
      {day.focus ? <p className="mt-2 text-muted">{day.focus}</p> : null}
      <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
        <Clock size={16} aria-hidden />
        {day.estimatedMinutes} minutes
      </p>

      <Button
        type="button"
        className="mt-8 w-full"
        onClick={() => {
          startSession(day.id);
        }}
      >
        <Play size={18} aria-hidden />
        Start workout
      </Button>

      <ol className="mt-8 space-y-4">
        {day.exercises.map((exercise, index) => (
          <li key={exercise.id}>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-medium">{exercise.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {exercise.sets ? `${exercise.sets} sets` : null}
                    {exercise.reps ? ` · ${exercise.reps} reps` : null}
                    {exercise.durationSeconds
                      ? ` · ${String(exercise.durationSeconds)}s`
                      : null}
                  </p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </main>
  );
}

"use client";

import Link from "next/link";
import { Skeleton } from "@/shared/ui";
import { ExerciseMedia } from "@/features/exercise-library/components/ExerciseMedia";
import { useExercise } from "@/features/exercise-library/hooks/useExercises";

type ExerciseDetailViewProps = {
  slug: string;
};

export function ExerciseDetailView({ slug }: ExerciseDetailViewProps) {
  const { data, isLoading, isError } = useExercise(slug);

  if (isLoading) {
    return <Skeleton className="h-96 w-full rounded-[var(--radius-md)]" />;
  }

  if (isError || !data?.exercise) {
    return <p className="text-sm text-error">Exercise not found.</p>;
  }

  const exercise = data.exercise;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/exercises" className="text-sm text-brand-500 hover:underline">
        ← Back to library
      </Link>

      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold">{exercise.name}</h1>
        <p className="text-sm text-muted">
          {[exercise.category, exercise.muscleGroup, exercise.location, exercise.difficulty]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {exercise.equipments.length ? (
          <p className="text-xs text-muted">Equipment: {exercise.equipments.join(", ")}</p>
        ) : null}
      </header>

      <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-card">
        <div className="aspect-[4/3] w-full bg-background">
          <ExerciseMedia
            src={exercise.imageUrl}
            alt={exercise.name}
            label={exercise.muscleGroup}
          />
        </div>
      </div>

      {(exercise.preparation || exercise.execution) && (
        <section className="space-y-3 rounded-[var(--radius-md)] border border-border bg-card p-4">
          <h2 className="font-display text-lg font-bold">Instructions</h2>
          {exercise.preparation ? (
            <div>
              <h3 className="text-sm font-semibold">Preparation</h3>
              <p className="mt-1 text-sm text-muted">{exercise.preparation}</p>
            </div>
          ) : null}
          {exercise.execution ? (
            <div>
              <h3 className="text-sm font-semibold">Execution</h3>
              <p className="mt-1 text-sm text-muted">{exercise.execution}</p>
            </div>
          ) : null}
        </section>
      )}

      <p className="text-xs text-muted">
        Data from{" "}
        <a
          href="https://oss.exercisedb.dev/docs"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          ExerciseDB (AscendAPI)
        </a>
        . Attribution required for non-commercial use.
      </p>
    </div>
  );
}

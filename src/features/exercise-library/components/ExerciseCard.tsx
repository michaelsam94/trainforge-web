"use client";

import Link from "next/link";
import { ExerciseMedia } from "@/features/exercise-library/components/ExerciseMedia";
import type { ExerciseSummary } from "@/features/exercise-library/types";

type ExerciseCardProps = {
  exercise: ExerciseSummary;
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link
      href={`/exercises/${encodeURIComponent(exercise.slug)}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-background">
        <ExerciseMedia
          src={exercise.imageUrl}
          alt={exercise.name}
          label={exercise.muscleGroup}
        />
        {exercise.isPremium ? (
          <span className="absolute right-2 top-2 rounded bg-background/90 px-2 py-0.5 text-[10px] font-medium text-muted">
            Premium
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-brand-500">
          {exercise.name}
        </h3>
        <p className="text-xs text-muted">
          {[exercise.muscleGroup, exercise.location, exercise.difficulty]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </Link>
  );
}

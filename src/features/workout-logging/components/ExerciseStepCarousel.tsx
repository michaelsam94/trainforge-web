"use client";

import { cn } from "@/shared/lib/cn";

type ExerciseStepCarouselProps = {
  exercises: Array<{ id: string; name: string }>;
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function ExerciseStepCarousel({
  exercises,
  currentIndex,
  onSelect,
}: ExerciseStepCarouselProps) {
  return (
    <nav
      aria-label="Exercises"
      className="flex gap-2 overflow-x-auto px-4 py-3"
      style={{ minHeight: 72 }}
    >
      {exercises.map((exercise, index) => (
        <button
          key={exercise.id}
          type="button"
          onClick={() => {
            onSelect(index);
          }}
          aria-current={index === currentIndex ? "step" : undefined}
          className={cn(
            "inline-flex h-12 min-w-[7.5rem] shrink-0 items-center justify-center rounded-[var(--radius-sm)] border px-3 text-xs font-medium",
            index === currentIndex
              ? "border-brand-400 bg-brand-50 text-brand-900"
              : "border-border bg-card text-muted",
          )}
        >
          <span className="line-clamp-2 text-center">{exercise.name}</span>
        </button>
      ))}
    </nav>
  );
}

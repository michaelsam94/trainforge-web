"use client";

import { useMemo, useState } from "react";
import { Input, Skeleton } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { ExerciseCard } from "@/features/exercise-library/components/ExerciseCard";
import { useExercises } from "@/features/exercise-library/hooks/useExercises";
import type {
  ExerciseDifficulty,
  ExerciseLocation,
} from "@/features/exercise-library/types";

const PAGE_SIZE = 24;

const LOCATION_OPTIONS: Array<{ value: ExerciseLocation; label: string }> = [
  { value: "home", label: "Home" },
  { value: "gym", label: "Gym" },
  { value: "both", label: "Both" },
];

const DIFFICULTY_OPTIONS: Array<{ value: ExerciseDifficulty; label: string }> = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-brand-400 bg-brand-50 text-brand-900"
          : "border-border bg-card text-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function ExerciseLibraryView() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<ExerciseLocation | undefined>();
  const [difficulty, setDifficulty] = useState<ExerciseDifficulty | undefined>();
  const [page, setPage] = useState(0);

  const params = useMemo(
    () => ({
      q: query.trim() || undefined,
      location,
      difficulty,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    }),
    [query, location, difficulty, page],
  );

  const { data, isLoading, isError, error, refetch } = useExercises(params);
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const isEmpty = !isLoading && !isError && (data?.exercises.length ?? 0) === 0;

  const resetPage = () => setPage(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Exercise Library</h1>
            <p className="mt-1 text-sm text-muted">
              {data?.total
                ? `${data.total.toLocaleString()} exercises with GIF demonstrations`
                : "Browse exercises with GIF animations and instructions."}
            </p>
          </div>
          <Input
            label="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Search exercises..."
            className="max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted">Location</span>
            {LOCATION_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                active={location === option.value}
                onClick={() => {
                  setLocation((current) => (current === option.value ? undefined : option.value));
                  resetPage();
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted">Difficulty</span>
            {DIFFICULTY_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                active={difficulty === option.value}
                onClick={() => {
                  setDifficulty((current) => (current === option.value ? undefined : option.value));
                  resetPage();
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[4/3] w-full rounded-[var(--radius-md)]" />
          ))}
        </div>
      ) : isError ? (
        <div className="space-y-2 rounded-[var(--radius-md)] border border-error/30 bg-error/5 p-4">
          <p className="text-sm text-error">Could not load exercises.</p>
          <p className="text-xs text-muted">
            {error instanceof Error ? error.message : "Check that the API is running on port 2020."}
          </p>
          <button
            type="button"
            className="text-sm font-medium text-brand-500 hover:underline"
            onClick={() => {
              void refetch();
            }}
          >
            Try again
          </button>
        </div>
      ) : isEmpty ? (
        <div className="rounded-[var(--radius-md)] border border-border bg-card p-6 text-sm text-muted">
          No exercises match your filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {data?.exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm disabled:opacity-50"
                disabled={page === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
              >
                Previous
              </button>
              <p className="text-sm text-muted">
                Page {page + 1} of {totalPages}
              </p>
              <button
                type="button"
                className="rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm disabled:opacity-50"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

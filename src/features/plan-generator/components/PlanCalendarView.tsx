import { PlanDaySkeleton } from "@/shared/ui";
import { PlanDayCard } from "@/features/plan-generator/components/PlanDayCard";
import type { PlanDay, TrainingPlan } from "@/features/plan-generator/types";

type PlanCalendarViewProps = {
  plan: TrainingPlan | null;
  isLoading: boolean;
  isGenerating: boolean;
  isEmpty: boolean;
  canUseAi?: boolean;
  errorMessage?: string;
  onGenerate?: () => void;
  onReset?: () => void;
  isGeneratePending?: boolean;
  isResetPending?: boolean;
};

export function PlanCalendarView({
  plan,
  isLoading,
  isGenerating,
  isEmpty,
  canUseAi = false,
  errorMessage,
  onGenerate,
  onReset,
  isGeneratePending = false,
  isResetPending = false,
}: PlanCalendarViewProps) {
  const days: PlanDay[] = plan?.days ?? [];

  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Your plan</h1>
          <p className="mt-1 text-sm text-muted">
            {isGenerating
              ? "AI is building your weekly program…"
              : canUseAi
                ? "Weekly adaptive calendar"
                : "Weekly manual plan from the exercise catalog"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onReset && !isEmpty ? (
            <button
              type="button"
              onClick={onReset}
              disabled={isResetPending || isGenerating || isGeneratePending}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-full)] border border-border px-5 text-sm font-medium text-muted hover:text-foreground disabled:opacity-60"
            >
              {isResetPending ? "Resetting…" : "Reset plan"}
            </button>
          ) : null}
          {isEmpty && onGenerate ? (
            <button
              type="button"
              onClick={onGenerate}
              disabled={isGeneratePending || isGenerating}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-full)] bg-brand-400 px-6 text-base font-medium text-white disabled:opacity-60"
            >
              {isGeneratePending || isGenerating ? "Generating…" : "Regenerate with AI"}
            </button>
          ) : null}
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-[var(--radius-md)] border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {errorMessage}
        </p>
      ) : null}

      <div
        className="shelf mt-6 touch-pan-x py-2"
        aria-busy={isLoading || isGenerating}
        aria-live="polite"
      >
        {isLoading || isGenerating
          ? Array.from({ length: 7 }).map((_, index) => <PlanDaySkeleton key={index} />)
          : days.map((day) => <PlanDayCard key={day.id} day={day} />)}
      </div>

      {isGenerating ? (
        <p className="mt-6 text-sm text-muted">
          Hang tight — your calendar stays visible with skeleton placeholders while the coach
          assembles your sessions.
        </p>
      ) : null}

      {!isLoading && !isGenerating && plan?.status === "ready" && days.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No workout days in this plan yet.</p>
      ) : null}
    </main>
  );
}

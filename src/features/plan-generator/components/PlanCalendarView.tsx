import { PlanDaySkeleton } from "@/shared/ui";
import { Button } from "@/shared/ui/Button";
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
  const showReset = Boolean(onReset && plan);

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
          {showReset ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={isResetPending}
              disabled={isGenerating || isGeneratePending}
              onClick={onReset}
            >
              Reset plan
            </Button>
          ) : null}
          {isEmpty && onGenerate ? (
            <Button
              type="button"
              size="sm"
              loading={isGeneratePending || isGenerating}
              disabled={isGeneratePending || isGenerating}
              onClick={onGenerate}
            >
              Regenerate with AI
            </Button>
          ) : null}
        </div>
      </div>

      {errorMessage ? (
        <div className="mt-4 space-y-3 rounded-[var(--radius-md)] border border-error/30 bg-error/10 p-4">
          <p className="text-sm text-error">{errorMessage}</p>
          {showReset ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={isResetPending}
              onClick={onReset}
            >
              Reset and start over
            </Button>
          ) : null}
        </div>
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

      {showReset && !errorMessage ? (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted">Want a different program?</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 px-0"
            loading={isResetPending}
            disabled={isGenerating || isGeneratePending}
            onClick={onReset}
          >
            Reset plan and build from scratch
          </Button>
        </div>
      ) : null}
    </main>
  );
}

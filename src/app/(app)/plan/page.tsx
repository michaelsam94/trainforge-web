import { Suspense } from "react";
import { PlanCalendarContainer } from "@/features/plan-generator/components/PlanCalendarContainer";

export default function PlanPage() {
  return (
    <Suspense fallback={<PlanPageFallback />}>
      <PlanCalendarContainer />
    </Suspense>
  );
}

function PlanPageFallback() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Your plan</h1>
      <p className="mt-2 text-sm text-muted">Loading your calendar…</p>
    </main>
  );
}

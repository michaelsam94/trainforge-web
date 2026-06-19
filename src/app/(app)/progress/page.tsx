"use client";

import { Suspense } from "react";
import { ProgressDashboardContainer } from "@/features/progress-tracking/components/ProgressDashboardContainer";
import { WearableSyncSection } from "@/features/wearable-sync/components/WearableSyncSection";

export default function ProgressPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Progress</h1>
      <p className="mt-1 text-sm text-muted">Adherence, volume, and skill mastery</p>
      <ProgressDashboardContainer />
      <div className="mt-8">
        <Suspense fallback={null}>
          <WearableSyncSection />
        </Suspense>
      </div>
    </main>
  );
}

"use client";

import { Suspense } from "react";
import { Card, ProgressRing, Skeleton } from "@/shared/ui";
import { BadgeShelf } from "@/features/progress-tracking/components/BadgeShelf";
import { useBadges, useProgressSummary } from "@/features/progress-tracking/hooks/useProgress";
import { ProfileSubscriptionSection } from "@/features/billing/components/ProfileSubscriptionSection";
import { DeleteAccountSection } from "@/features/privacy/components/DeleteAccountSection";

export default function ProfilePage() {
  const { data: summary, isLoading: summaryLoading } = useProgressSummary();
  const { data: badgesData, isLoading: badgesLoading } = useBadges();

  const adherence = summary?.adherence;

  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-muted">Badges, settings, subscription</p>

      <div className="mt-8 space-y-6">
        <Suspense fallback={null}>
          <ProfileSubscriptionSection />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="font-display text-lg font-bold">This week</h2>
            <div className="mt-4 flex justify-center">
              {summaryLoading || !adherence ? (
                <Skeleton className="size-[120px] rounded-full" />
              ) : (
                <ProgressRing
                  value={adherence.completed}
                  max={adherence.target}
                  label={`${String(adherence.completed)} of ${String(adherence.target)} workouts completed`}
                />
              )}
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-lg font-bold">Badges</h2>
            <div className="mt-4">
              {badgesLoading ? (
                <Skeleton className="h-10 w-full rounded-[var(--radius-xs)]" />
              ) : (
                <BadgeShelf badges={badgesData?.badges ?? []} />
              )}
            </div>
          </Card>
        </div>

        <DeleteAccountSection />
      </div>
    </main>
  );
}

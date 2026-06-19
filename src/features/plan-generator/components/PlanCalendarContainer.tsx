"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  useBuildManualPlanMutation,
  useGeneratePlanMutation,
  usePlan,
} from "@/features/plan-generator/hooks/usePlan";
import { PlanBuilderForm } from "@/features/plan-generator/components/PlanBuilderForm";
import { PlanCalendarView } from "@/features/plan-generator/components/PlanCalendarView";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { tierIncludesFeature } from "@/features/billing/api/billingApi";

export function PlanCalendarContainer() {
  const searchParams = useSearchParams();
  const shouldAutoGenerate = searchParams.get("generate") === "1";
  const autoTriggered = useRef(false);

  const { data: plan, isLoading, isError, error } = usePlan();
  const generatePlan = useGeneratePlanMutation();
  const buildManualPlan = useBuildManualPlanMutation();
  const { data: authData } = useCurrentUser();
  const tier = authData?.user.subscriptionTier ?? "free";
  const canGenerateAi = tierIncludesFeature(tier, "generate_plan");

  const isGenerating = plan?.status === "generating" || generatePlan.isPending;
  const isBuilding = buildManualPlan.isPending;
  const isEmpty = !plan && !isLoading;
  const failedMessage =
    plan?.status === "failed"
      ? (plan.errorMessage ?? "Plan generation failed. Try again.")
      : undefined;

  useEffect(() => {
    if (!canGenerateAi) return;
    if (!shouldAutoGenerate || autoTriggered.current || isLoading) return;
    if (plan?.status === "ready" || plan?.status === "generating") return;

    autoTriggered.current = true;
    void generatePlan.mutateAsync();
  }, [canGenerateAi, shouldAutoGenerate, isLoading, plan?.status, generatePlan]);

  if (!isLoading && isEmpty) {
    return (
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <h1 className="font-display text-2xl font-bold">Your plan</h1>
        <p className="mt-1 text-sm text-muted">
          Build a free catalog-based plan or upgrade for AI adaptation.
        </p>
        <div className="mt-6">
          <PlanBuilderForm
            tier={tier}
            isBuilding={isBuilding}
            isGenerating={isGenerating}
            onBuildCatalog={() => {
              void buildManualPlan.mutateAsync({ mode: "catalog" });
            }}
            onBuildByBodyParts={(bodyParts) => {
              void buildManualPlan.mutateAsync({ mode: "body_parts", bodyParts });
            }}
            onGenerateAi={() => {
              void generatePlan.mutateAsync();
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <PlanCalendarView
      plan={plan ?? null}
      isLoading={isLoading}
      isGenerating={isGenerating}
      isEmpty={isEmpty}
      canUseAi={canGenerateAi}
      errorMessage={
        failedMessage ??
        (isError && error instanceof Error ? error.message : undefined)
      }
      onGenerate={
        canGenerateAi
          ? () => {
              void generatePlan.mutateAsync();
            }
          : undefined
      }
      isGeneratePending={generatePlan.isPending}
    />
  );
}

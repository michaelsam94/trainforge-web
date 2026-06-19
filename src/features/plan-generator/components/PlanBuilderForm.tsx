"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Button, Card } from "@/shared/ui";
import { BODY_PART_OPTIONS } from "@/features/plan-generator/constants/bodyParts";
import { UpgradePrompt } from "@/features/billing/components/BillingUi";
import { tierIncludesFeature } from "@/features/billing/api/billingApi";
import type { SubscriptionTier } from "@/features/billing/types";

type PlanBuilderFormProps = {
  tier: SubscriptionTier;
  isBuilding: boolean;
  isGenerating: boolean;
  onBuildCatalog: () => void;
  onBuildByBodyParts: (bodyParts: string[]) => void;
  onGenerateAi?: () => void;
};

export function PlanBuilderForm({
  tier,
  isBuilding,
  isGenerating,
  onBuildCatalog,
  onBuildByBodyParts,
  onGenerateAi,
}: PlanBuilderFormProps) {
  const [mode, setMode] = useState<"catalog" | "body_parts">("catalog");
  const [selectedParts, setSelectedParts] = useState<string[]>(["chest", "back", "upper legs"]);
  const canUseAi = tierIncludesFeature(tier, "generate_plan");

  const togglePart = (value: string) => {
    setSelectedParts((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Build a plan without AI</h2>
        <p className="mt-2 text-sm text-muted">
          Free plans use exercises from the TrainForge catalog based on your onboarding profile.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("catalog")}
            className={cn(
              "rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium",
              mode === "catalog"
                ? "border-brand-400 bg-brand-50 text-brand-900"
                : "border-border bg-card text-muted",
            )}
          >
            Full catalog rotation
          </button>
          <button
            type="button"
            onClick={() => setMode("body_parts")}
            className={cn(
              "rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium",
              mode === "body_parts"
                ? "border-brand-400 bg-brand-50 text-brand-900"
                : "border-border bg-card text-muted",
            )}
          >
            Choose body parts
          </button>
        </div>

        {mode === "body_parts" ? (
          <div className="mt-4">
            <p className="text-xs font-medium text-muted">Training focus</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {BODY_PART_OPTIONS.map((part) => (
                <button
                  key={part.value}
                  type="button"
                  onClick={() => togglePart(part.value)}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium",
                    selectedParts.includes(part.value)
                      ? "border-brand-400 bg-brand-50 text-brand-900"
                      : "border-border bg-card text-muted",
                  )}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            We&apos;ll rotate chest, back, legs, shoulders, and more across your available training
            days using exercises that match your equipment and level.
          </p>
        )}

        <div className="mt-6">
          <Button
            type="button"
            loading={isBuilding}
            disabled={isGenerating || (mode === "body_parts" && selectedParts.length === 0)}
            onClick={() => {
              if (mode === "catalog") {
                onBuildCatalog();
                return;
              }
              onBuildByBodyParts(selectedParts);
            }}
          >
            Build my plan
          </Button>
        </div>
      </Card>

      {canUseAi ? (
        <Card className="border-brand-400/30 p-6">
          <h2 className="font-display text-lg font-bold">AI adaptive plan</h2>
          <p className="mt-2 text-sm text-muted">
            Pro uses AI to generate and adapt your weekly program from workouts and recovery signals.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            loading={isGenerating}
            disabled={isBuilding}
            onClick={() => onGenerateAi?.()}
          >
            Generate with AI
          </Button>
        </Card>
      ) : (
        <UpgradePrompt
          feature="generate_plan"
          currentTier={tier}
          title="Want AI-generated plans?"
          description="Upgrade to Pro for AI plan generation, mid-workout adaptation, and streaming coach chat."
        />
      )}
    </div>
  );
}

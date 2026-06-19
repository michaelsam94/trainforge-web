"use client";

import Link from "next/link";
import { Button, Card } from "@/shared/ui";
import type { BillableFeature, SubscriptionTier } from "@/features/billing/types";
import { requiredTierLabel } from "@/features/billing/api/billingApi";
import { useCheckoutMutation } from "@/features/billing/hooks/useBilling";

type UpgradePromptProps = {
  feature: BillableFeature;
  title: string;
  description: string;
  currentTier?: SubscriptionTier;
};

export function UpgradePrompt({ feature, title, description, currentTier = "free" }: UpgradePromptProps) {
  const checkout = useCheckoutMutation();
  const requiredTier = feature === "wearables" || feature === "advanced_analytics" ? "premium" : "pro";
  const canUpgrade = currentTier === "free" || (currentTier === "pro" && requiredTier === "premium");

  return (
    <Card className="border-brand-400/40 bg-brand-50/40 p-6">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <p className="mt-3 text-sm text-foreground">
        Requires <span className="font-semibold">{requiredTierLabel(feature)}</span>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {canUpgrade ? (
          <Button
            type="button"
            loading={checkout.isPending}
            onClick={() => {
              void checkout.mutateAsync(requiredTier);
            }}
          >
            Upgrade to {requiredTier === "premium" ? "Premium" : "Pro"}
          </Button>
        ) : null}
        <Button href="/pricing" variant="secondary">
          Compare plans
        </Button>
      </div>
    </Card>
  );
}

type SubscriptionCardProps = {
  tier: SubscriptionTier;
  status: string;
  currentPeriodEnd: string | null;
  features: BillableFeature[];
  onManage: () => void;
  onUpgrade: (tier: "pro" | "premium") => void;
  isManaging: boolean;
  isUpgrading: boolean;
};

export function SubscriptionCard({
  tier,
  status,
  currentPeriodEnd,
  features,
  onManage,
  onUpgrade,
  isManaging,
  isUpgrading,
}: SubscriptionCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold">Subscription</h2>
          <p className="mt-1 text-sm text-muted">
            Current plan: <span className="font-medium capitalize text-foreground">{tier}</span>
          </p>
          <p className="text-sm text-muted">Status: {status}</p>
          {currentPeriodEnd ? (
            <p className="text-sm text-muted">
              Renews {new Date(currentPeriodEnd).toLocaleDateString()}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {tier === "free" ? (
            <>
              <Button type="button" loading={isUpgrading} onClick={() => { onUpgrade("pro"); }}>
                Upgrade to Pro
              </Button>
              <Button type="button" variant="secondary" loading={isUpgrading} onClick={() => { onUpgrade("premium"); }}>
                Go Premium
              </Button>
            </>
          ) : (
            <Button type="button" variant="secondary" loading={isManaging} onClick={onManage}>
              Manage billing
            </Button>
          )}
        </div>
      </div>

      {features.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {features.map((feature) => (
            <li key={feature}>• {feature.replaceAll("_", " ")}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">
          Free includes manual catalog plans. Upgrade for AI generation, coach chat, and wearable sync.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Need help choosing? <Link href="/pricing" className="text-brand-600 underline">View pricing</Link>
      </p>
    </Card>
  );
}

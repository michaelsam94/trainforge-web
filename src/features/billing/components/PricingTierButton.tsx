"use client";

import { Button } from "@/shared/ui";
import { useCheckoutMutation } from "@/features/billing/hooks/useBilling";
import type { CheckoutTier } from "@/features/billing/types";

type PricingTierButtonProps = {
  tier: CheckoutTier | "free";
  label: string;
  highlighted?: boolean;
};

export function PricingTierButton({ tier, label, highlighted }: PricingTierButtonProps) {
  const checkout = useCheckoutMutation();

  if (tier === "free") {
    return (
      <Button href="/signup" variant={highlighted ? "primary" : "secondary"} className="w-full">
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={highlighted ? "primary" : "secondary"}
      className="w-full"
      loading={checkout.isPending}
      onClick={() => {
        void checkout.mutateAsync(tier);
      }}
    >
      {label}
    </Button>
  );
}

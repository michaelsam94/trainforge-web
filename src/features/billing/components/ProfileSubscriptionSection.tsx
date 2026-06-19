"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  SubscriptionCard,
} from "@/features/billing/components/BillingUi";
import {
  completeStubCheckout,
} from "@/features/billing/api/billingApi";
import {
  useCheckoutMutation,
  usePortalMutation,
  useRefreshSubscription,
  useSubscription,
} from "@/features/billing/hooks/useBilling";
import { useToast } from "@/shared/ui";

export function ProfileSubscriptionSection() {
  const { data: subscription, isLoading } = useSubscription();
  const checkout = useCheckoutMutation();
  const portal = usePortalMutation();
  const refreshSubscription = useRefreshSubscription();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const checkoutState = searchParams.get("checkout");
    const tier = searchParams.get("tier");
    if (checkoutState === "stub" && (tier === "pro" || tier === "premium")) {
      void (async () => {
        await completeStubCheckout(tier);
        await refreshSubscription();
        toast(`${tier === "premium" ? "Premium" : "Pro"} plan activated locally.`, "success");
      })();
    }
    if (checkoutState === "success") {
      void refreshSubscription();
      toast("Subscription updated.", "success");
    }
  }, [refreshSubscription, searchParams, toast]);

  if (isLoading || !subscription) {
    return null;
  }

  return (
    <SubscriptionCard
      tier={subscription.tier}
      status={subscription.status}
      currentPeriodEnd={subscription.currentPeriodEnd}
      features={subscription.features}
      isManaging={portal.isPending}
      isUpgrading={checkout.isPending}
      onManage={() => {
        void portal.mutateAsync();
      }}
      onUpgrade={(tier) => {
        void checkout.mutateAsync(tier);
      }}
    />
  );
}

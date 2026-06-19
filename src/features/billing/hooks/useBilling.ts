"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeStubCheckout,
  createCheckoutSession,
  createPortalSession,
  fetchSubscription,
} from "@/features/billing/api/billingApi";
import type { CheckoutTier } from "@/features/billing/types";
import { authQueryKey } from "@/features/auth/hooks/useAuth";
import { useToast } from "@/shared/ui";

export const subscriptionQueryKey = ["billing", "subscription"] as const;

export function useSubscription() {
  return useQuery({
    queryKey: subscriptionQueryKey,
    queryFn: fetchSubscription,
    select: (data) => data.subscription,
  });
}

export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (tier: CheckoutTier) => {
      const checkout = await createCheckoutSession(tier);
      if (checkout.url.includes("checkout=stub")) {
        await completeStubCheckout(tier);
        return { stub: true as const, tier };
      }
      return { stub: false as const, url: checkout.url, tier };
    },
    onSuccess: async (result) => {
      if (result.stub) {
        await queryClient.invalidateQueries({ queryKey: subscriptionQueryKey });
        await queryClient.invalidateQueries({ queryKey: authQueryKey });
        toast(`${result.tier === "premium" ? "Premium" : "Pro"} plan activated locally.`, "success");
        return;
      }
      window.location.href = result.url;
    },
    onError: () => {
      toast("Could not start checkout. Try again.", "error");
    },
  });
}

export function usePortalMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: createPortalSession,
    onSuccess: (result) => {
      window.location.href = result.url;
    },
    onError: () => {
      toast("Billing portal is unavailable for this account.", "warning");
    },
  });
}

export function useRefreshSubscription() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: subscriptionQueryKey });
    await queryClient.invalidateQueries({ queryKey: authQueryKey });
  };
}

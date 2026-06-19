import { apiClient } from "@/shared/lib/apiClient";
import type {
  CheckoutResponse,
  CheckoutTier,
  PortalResponse,
  SubscriptionResponse,
  SubscriptionTier,
  BillableFeature,
} from "@/features/billing/types";

export async function fetchSubscription(): Promise<SubscriptionResponse> {
  return apiClient.get<SubscriptionResponse>("/billing/subscription");
}

export async function createCheckoutSession(tier: CheckoutTier): Promise<CheckoutResponse> {
  return apiClient.post<CheckoutResponse>("/billing/checkout", { tier });
}

export async function createPortalSession(): Promise<PortalResponse> {
  return apiClient.post<PortalResponse>("/billing/portal", {});
}

export async function completeStubCheckout(tier: CheckoutTier): Promise<{ subscription: { tier: SubscriptionTier } }> {
  return apiClient.post<{ subscription: { tier: SubscriptionTier } }>(`/billing/checkout/stub?tier=${tier}`);
}

export function tierLabel(tier: SubscriptionTier): string {
  if (tier === "premium") return "Premium";
  if (tier === "pro") return "Pro";
  return "Free";
}

export function requiredTierLabel(feature: BillableFeature): string {
  if (feature === "wearables" || feature === "advanced_analytics") return "Premium";
  return "Pro";
}

export function tierIncludesFeature(tier: SubscriptionTier, feature: BillableFeature): boolean {
  if (feature === "manual_plan") return true;
  if (feature === "wearables" || feature === "advanced_analytics") {
    return tier === "premium";
  }
  return tier === "pro" || tier === "premium";
}

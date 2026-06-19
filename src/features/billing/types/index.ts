export type SubscriptionTier = "free" | "pro" | "premium";

export type BillableFeature =
  | "manual_plan"
  | "generate_plan"
  | "adapt_plan"
  | "chat"
  | "wearables"
  | "advanced_analytics";

export type SubscriptionDto = {
  tier: SubscriptionTier;
  status: string;
  currentPeriodEnd: string | null;
  features: BillableFeature[];
};

export type CheckoutTier = "pro" | "premium";

export type CheckoutResponse = {
  url: string;
  sessionId: string;
};

export type PortalResponse = {
  url: string;
};

export type SubscriptionResponse = {
  subscription: SubscriptionDto;
};

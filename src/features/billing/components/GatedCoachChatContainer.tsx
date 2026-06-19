"use client";

import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { UpgradePrompt } from "@/features/billing/components/BillingUi";
import { tierIncludesFeature } from "@/features/billing/api/billingApi";
import { CoachChatContainer } from "@/features/ai-coach-chat/components/CoachChatContainer";

export function GatedCoachChatContainer() {
  const { data: authData } = useCurrentUser();
  const tier = authData?.user.subscriptionTier ?? "free";

  if (!tierIncludesFeature(tier, "chat")) {
    return (
      <div className="mt-6">
        <UpgradePrompt
          feature="chat"
          currentTier={tier}
          title="Unlock your AI coach"
          description="Get streaming coaching mid-workout with Pro or Premium."
        />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <CoachChatContainer />
    </div>
  );
}

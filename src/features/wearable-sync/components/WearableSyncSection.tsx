"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WearableConnectCard } from "@/features/wearable-sync/components/WearableConnectCard";
import { WearableMetricCards } from "@/features/wearable-sync/components/WearableMetricCards";
import {
  useSyncWearables,
  useWearableMetrics,
} from "@/features/wearable-sync/hooks/useWearables";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useToast } from "@/shared/ui";

export function WearableSyncSection() {
  const { data, isLoading } = useWearableMetrics();
  const sync = useSyncWearables();
  const { data: authData } = useCurrentUser();
  const canUseWearables = Boolean(authData?.user);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const wearable = searchParams.get("wearable");
    if (wearable === "connected") {
      toast("Fitbit connected — recovery signals are now active.", "success");
    }
  }, [searchParams, toast]);

  if (isLoading) {
    return null;
  }
  if (!canUseWearables) return null;

  return (
    <div className="space-y-6">
      <WearableMetricCards
        metrics={data?.metrics ?? []}
        recovery={data?.recovery ?? null}
      />
      <WearableConnectCard
        connections={data?.connections ?? []}
        isSyncing={sync.isPending}
        onSync={() => {
          sync.mutate(undefined, {
            onSuccess: (result) => {
              toast(`Synced ${String(result.synced)} wearable metrics.`, "success");
            },
            onError: () => {
              toast("Wearable sync failed. Try again shortly.", "error");
            },
          });
        }}
      />
    </div>
  );
}

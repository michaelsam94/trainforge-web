"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { syncOfflineWorkouts } from "@/features/offline-sync/api/offlineSyncApi";
import {
  getOfflineQueueLength,
  readOfflineQueue,
  removeOfflineEntries,
} from "@/features/offline-sync/lib/offlineQueue";
import { useOnlineStatus } from "@/features/ai-coach-chat/hooks/useOnlineStatus";
import { planQueryKey } from "@/features/plan-generator/hooks/usePlan";
import { ApiError } from "@/shared/lib/apiClient";

export function useOfflineSync() {
  const online = useOnlineStatus();
  const queryClient = useQueryClient();
  const [queueLength, setQueueLength] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncError, setLastSyncError] = useState<string | null>(null);

  const refreshQueueLength = useCallback(() => {
    setQueueLength(getOfflineQueueLength());
  }, []);

  const flushQueue = useCallback(async () => {
    const entries = readOfflineQueue();
    if (entries.length === 0) {
      refreshQueueLength();
      return;
    }

    setIsSyncing(true);
    setLastSyncError(null);

    try {
      const response = await syncOfflineWorkouts(entries);
      const syncedIds = response.results.filter((item) => item.ok).map((item) => item.clientId);
      removeOfflineEntries(syncedIds);
      refreshQueueLength();
      await queryClient.invalidateQueries({ queryKey: planQueryKey });
      await queryClient.invalidateQueries({ queryKey: ["workouts", "adherence"] });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Failed to sync offline workouts";
      setLastSyncError(message);
    } finally {
      setIsSyncing(false);
    }
  }, [queryClient, refreshQueueLength]);

  useEffect(() => {
    refreshQueueLength();
  }, [refreshQueueLength]);

  useEffect(() => {
    if (online) {
      void flushQueue();
    }
  }, [online, flushQueue]);

  useEffect(() => {
    const onQueueChange = () => {
      refreshQueueLength();
    };
    window.addEventListener("trainforge-offline-queue-changed", onQueueChange);
    return () => {
      window.removeEventListener("trainforge-offline-queue-changed", onQueueChange);
    };
  }, [refreshQueueLength]);

  return {
    online,
    queueLength,
    isSyncing,
    lastSyncError,
    flushQueue,
    refreshQueueLength,
  };
}

export function notifyOfflineQueueChanged(): void {
  window.dispatchEvent(new Event("trainforge-offline-queue-changed"));
}

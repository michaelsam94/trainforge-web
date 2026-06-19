import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchWearableMetrics,
  fetchWearableStatus,
  syncWearables,
} from "@/features/wearable-sync/api/wearableApi";

export const wearableMetricsQueryKey = ["wearables", "metrics"] as const;
export const wearableStatusQueryKey = ["wearables", "status"] as const;

export function useWearableMetrics() {
  return useQuery({
    queryKey: wearableMetricsQueryKey,
    queryFn: fetchWearableMetrics,
  });
}

export function useWearableStatus() {
  return useQuery({
    queryKey: wearableStatusQueryKey,
    queryFn: fetchWearableStatus,
  });
}

export function useSyncWearables() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncWearables,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: wearableMetricsQueryKey }),
        queryClient.invalidateQueries({ queryKey: wearableStatusQueryKey }),
      ]);
    },
  });
}

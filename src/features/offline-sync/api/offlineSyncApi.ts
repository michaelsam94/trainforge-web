import { apiClient } from "@/shared/lib/apiClient";
import type {
  OfflineSyncEntry,
  OfflineSyncResponse,
} from "@/features/offline-sync/types";

export async function syncOfflineWorkouts(
  entries: OfflineSyncEntry[],
): Promise<OfflineSyncResponse> {
  return apiClient.post<OfflineSyncResponse>("/workouts/sync", { entries });
}

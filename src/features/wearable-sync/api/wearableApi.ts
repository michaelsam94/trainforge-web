import { apiClient } from "@/shared/lib/apiClient";
import type {
  WearableMetricsResponse,
  WearableStatusResponse,
} from "@/features/wearable-sync/types";

export async function fetchWearableMetrics(): Promise<WearableMetricsResponse> {
  return apiClient.get<WearableMetricsResponse>("/wearables/metrics");
}

export async function fetchWearableStatus(): Promise<WearableStatusResponse> {
  return apiClient.get<WearableStatusResponse>("/wearables/status");
}

export async function syncWearables(): Promise<{ synced: number }> {
  return apiClient.post<{ synced: number }>("/wearables/sync");
}

export function getFitbitConnectUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  return `${base.replace(/\/$/, "")}/wearables/connect/fitbit`;
}

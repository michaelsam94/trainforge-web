import type { WearableProviderStub } from "@/features/wearable-sync/types";

export const WEARABLE_PROVIDER_STUBS: WearableProviderStub[] = [
  { id: "fitbit", label: "Fitbit", available: true },
  { id: "garmin", label: "Garmin", available: false },
  { id: "apple_health", label: "Apple Health", available: false },
];

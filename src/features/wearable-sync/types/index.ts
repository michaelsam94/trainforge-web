export type WearableProviderId = "fitbit" | "garmin" | "apple_health";

export type WearableMetricType = "sleep_minutes" | "resting_hr" | "hrv_ms" | "steps";

export type WearableConnectionDto = {
  id: string;
  provider: WearableProviderId;
  status: "connected" | "disconnected" | "error";
  consentGrantedAt: string;
  consentVersion: string;
  dataRetentionDays: number;
  lastSyncedAt?: string;
};

export type WearableMetricDto = {
  provider: WearableProviderId;
  type: WearableMetricType;
  value: number;
  unit: string;
  recordedAt: string;
};

export type RecoverySignals = {
  sleepMinutes: number | null;
  restingHeartRate: number | null;
  hrvMs: number | null;
  steps: number | null;
  readinessScore: number;
  recommendation: "push" | "maintain" | "deload";
  adaptationNote: string | null;
};

export type WearableMetricsResponse = {
  metrics: WearableMetricDto[];
  recovery: RecoverySignals;
  connections: WearableConnectionDto[];
};

export type WearableStatusResponse = {
  connections: WearableConnectionDto[];
};

export type WearableProviderStub = {
  id: WearableProviderId;
  label: string;
  available: boolean;
};

import { Button, Card } from "@/shared/ui";
import { getFitbitConnectUrl } from "@/features/wearable-sync/api/wearableApi";
import { WEARABLE_PROVIDER_STUBS } from "@/features/wearable-sync/providers/stubs";
import type { WearableConnectionDto } from "@/features/wearable-sync/types";

type WearableConnectCardProps = {
  connections: WearableConnectionDto[];
  isSyncing: boolean;
  onSync: () => void;
};

export function WearableConnectCard({
  connections,
  isSyncing,
  onSync,
}: WearableConnectCardProps) {
  const fitbit = connections.find((connection) => connection.provider === "fitbit");
  const fitbitConnected = fitbit?.status === "connected";

  return (
    <Card className="p-6">
      <h2 className="font-display text-lg font-bold">Wearables</h2>
      <p className="mt-1 text-sm text-muted">
        Connect sleep and activity data to personalize recovery and plan adjustments.
      </p>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-4 py-3">
          <div>
            <p className="font-medium">Fitbit</p>
            <p className="text-sm text-muted">
              {fitbitConnected
                ? `Connected · last sync ${formatSyncTime(fitbit.lastSyncedAt)}`
                : "Sync sleep, heart rate, and steps"}
            </p>
          </div>
          {fitbitConnected ? (
            <Button type="button" variant="secondary" loading={isSyncing} onClick={onSync}>
              Sync now
            </Button>
          ) : (
            <Button type="button" onClick={() => { window.location.href = getFitbitConnectUrl(); }}>
              Connect Fitbit
            </Button>
          )}
        </div>

        {WEARABLE_PROVIDER_STUBS.filter((provider) => !provider.available).map((provider) => (
          <div
            key={provider.id}
            className="flex items-center justify-between rounded-[var(--radius-sm)] border border-dashed border-border px-4 py-3 opacity-70"
          >
            <div>
              <p className="font-medium">{provider.label}</p>
              <p className="text-sm text-muted">Coming soon</p>
            </div>
            <span className="rounded-[var(--radius-xs)] bg-card px-2 py-1 text-xs text-muted">
              Stub
            </span>
          </div>
        ))}
      </div>

      {fitbitConnected ? (
        <p className="mt-4 text-xs text-muted">
          Data retention: {String(fitbit.dataRetentionDays)} days · consent v
          {fitbit.consentVersion}
        </p>
      ) : null}
    </Card>
  );
}

function formatSyncTime(value?: string): string {
  if (!value) return "never";
  return new Date(value).toLocaleString();
}

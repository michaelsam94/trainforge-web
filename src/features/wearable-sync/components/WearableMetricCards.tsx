import { Card } from "@/shared/ui";
import type { RecoverySignals, WearableMetricDto } from "@/features/wearable-sync/types";

type WearableMetricCardsProps = {
  metrics: WearableMetricDto[];
  recovery: RecoverySignals | null;
};

export function WearableMetricCards({ metrics, recovery }: WearableMetricCardsProps) {
  if (!recovery && metrics.length === 0) {
    return null;
  }

  const latestByType = new Map<string, WearableMetricDto>();
  for (const metric of metrics) {
    latestByType.set(metric.type, metric);
  }

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Recovery signals</h2>
          {recovery?.adaptationNote ? (
            <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
              {recovery.adaptationNote}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted">Wearable data is informing your training load.</p>
          )}
        </div>
        {recovery ? (
          <div className="rounded-[var(--radius-sm)] bg-brand-50 px-3 py-2 text-center dark:bg-brand-900/20">
            <p className="text-xs text-muted">Readiness</p>
            <p className="text-xl font-bold">{recovery.readinessScore}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricItem label="Sleep" value={formatMetric(latestByType.get("sleep_minutes"), " min")} />
        <MetricItem label="Resting HR" value={formatMetric(latestByType.get("resting_hr"), " bpm")} />
        <MetricItem label="HRV" value={formatMetric(latestByType.get("hrv_ms"), " ms")} />
        <MetricItem label="Steps" value={formatMetric(latestByType.get("steps"), "")} />
      </div>
    </Card>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-card px-3 py-3 ring-1 ring-[var(--border)]">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function formatMetric(metric: WearableMetricDto | undefined, suffix: string): string {
  if (!metric) return "—";
  return `${String(Math.round(metric.value))}${suffix}`;
}

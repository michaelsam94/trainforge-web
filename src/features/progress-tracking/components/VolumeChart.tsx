"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { WeeklyVolumePoint } from "@/features/progress-tracking/types";

const VolumeChartInner = dynamic(
  () =>
    import("@/features/progress-tracking/components/VolumeChartInner").then(
      (module) => module.VolumeChartInner,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-60 items-center justify-center rounded-[var(--radius-md)] bg-card text-sm text-muted"
        aria-hidden
      >
        Loading chart…
      </div>
    ),
  },
);

type VolumeChartProps = {
  weeklyVolume: WeeklyVolumePoint[];
};

export function VolumeChart({ weeklyVolume }: VolumeChartProps) {
  const chartData = useMemo(() => weeklyVolume, [weeklyVolume]);

  return (
    <div aria-label="Weekly workout volume chart">
      <VolumeChartInner data={chartData} />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { SkillRadar } from "@/features/progress-tracking/types";

const SkillRadarChartInner = dynamic(
  () =>
    import("@/features/progress-tracking/components/SkillRadarChartInner").then(
      (module) => module.SkillRadarChartInner,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-64 items-center justify-center rounded-[var(--radius-md)] bg-card text-sm text-muted"
        aria-hidden
      >
        Loading radar…
      </div>
    ),
  },
);

type SkillRadarChartProps = {
  skillRadar: SkillRadar;
};

export function SkillRadarChart({ skillRadar }: SkillRadarChartProps) {
  const radarData = useMemo(() => skillRadar, [skillRadar]);

  return (
    <div aria-label="Skill mastery radar chart">
      <SkillRadarChartInner skillRadar={radarData} />
    </div>
  );
}

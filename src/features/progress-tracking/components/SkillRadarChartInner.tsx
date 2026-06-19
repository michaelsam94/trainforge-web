"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { SkillRadar } from "@/features/progress-tracking/types";

type SkillRadarChartInnerProps = {
  skillRadar: SkillRadar;
};

export function SkillRadarChartInner({ skillRadar }: SkillRadarChartInnerProps) {
  const chartData = [
    { skill: "Strength", value: skillRadar.strength },
    { skill: "Endurance", value: skillRadar.endurance },
    { skill: "Mobility", value: skillRadar.mobility },
    { skill: "Consistency", value: skillRadar.consistency },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted)", fontSize: 12 }} />
        <Radar
          dataKey="value"
          stroke="var(--brand-400)"
          fill="var(--brand-400)"
          fillOpacity={0.35}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeeklyVolumePoint } from "@/features/progress-tracking/types";

type VolumeChartInnerProps = {
  data: WeeklyVolumePoint[];
};

function formatWeekLabel(weekStart: string): string {
  const date = new Date(`${weekStart}T00:00:00.000Z`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function VolumeChartInner({ data }: VolumeChartInnerProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: formatWeekLabel(point.weekStart),
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
          }}
          labelFormatter={(_, payload) => {
            const item = payload?.[0]?.payload as WeeklyVolumePoint | undefined;
            return item ? `Week of ${formatWeekLabel(item.weekStart)}` : "Week";
          }}
        />
        <Bar dataKey="workouts" name="Workouts" fill="var(--brand-400)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="sets" name="Sets" fill="var(--accent-400)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ProgressDashboardView } from "@/features/progress-tracking/components/ProgressDashboardView";
import type { ProgressSummary } from "@/features/progress-tracking/types";

vi.mock("@/features/progress-tracking/components/VolumeChart", () => ({
  VolumeChart: () => <div aria-label="Weekly workout volume chart">Volume chart</div>,
}));

vi.mock("@/features/progress-tracking/components/SkillRadarChart", () => ({
  SkillRadarChart: () => <div aria-label="Skill mastery radar chart">Skill radar</div>,
}));

const summary: ProgressSummary = {
  adherence: { completed: 4, target: 7, percent: 57 },
  totals: { workouts: 12, sets: 96, volumeKg: 1240 },
  weeklyVolume: [
    { weekStart: "2026-06-09", workouts: 3, sets: 24 },
    { weekStart: "2026-06-16", workouts: 4, sets: 32 },
  ],
  skillRadar: { strength: 72, endurance: 58, mobility: 64, consistency: 57 },
  streaks: { currentStreak: 3, longestStreak: 5, lastWorkoutDate: "2026-06-19" },
};

describe("ProgressDashboardView", () => {
  it("renders adherence and streak stats", () => {
    render(
      <ProgressDashboardView
        summary={summary}
        history={[
          {
            id: "w1",
            title: "Monday strength",
            completedAt: "2026-06-16T10:00:00.000Z",
            setCount: 9,
            difficultyRating: 3,
          },
        ]}
        badges={[
          {
            id: "first_workout",
            title: "First workout",
            description: "Complete your first logged session.",
            earned: true,
          },
        ]}
        isLoading={false}
        isHistoryLoading={false}
      />,
    );

    expect(screen.getByText("4 of 7 planned workouts completed this week")).toBeInTheDocument();
    expect(screen.getByText("3 days")).toBeInTheDocument();
    expect(screen.getByText("Monday strength")).toBeInTheDocument();
    expect(screen.getByText("First workout")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ProgressDashboardView
        summary={summary}
        history={[]}
        badges={[]}
        isLoading={false}
        isHistoryLoading={false}
      />,
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

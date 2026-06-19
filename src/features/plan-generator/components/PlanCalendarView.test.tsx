import { describe, expect, it, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { PlanCalendarView } from "@/features/plan-generator/components/PlanCalendarView";
import type { TrainingPlan } from "@/features/plan-generator/types";

const readyPlan: TrainingPlan = {
  id: "plan-1",
  status: "ready",
  weekStart: "2026-06-16",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  days: Array.from({ length: 7 }).map((_, index) => ({
    id: `day-${String(index)}`,
    dayIndex: index,
    scheduledDate: `2026-06-${String(16 + index).padStart(2, "0")}`,
    title: `Day ${String(index + 1)} strength`,
    estimatedMinutes: 45,
    exerciseCount: 3,
    exercises: [],
  })),
};

const server = setupServer(
  http.get("/api/plans/current", () => HttpResponse.json({ plan: readyPlan })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithProviders(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe("PlanCalendarView", () => {
  it("renders seven day cards when plan is ready", async () => {
    renderWithProviders(
      <PlanCalendarView
        plan={readyPlan}
        isLoading={false}
        isGenerating={false}
        isEmpty={false}
      />,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(7);
    });
    expect(screen.getByText("Day 1 strength")).toBeInTheDocument();
  });

  it("shows skeleton placeholders while generating", () => {
    renderWithProviders(
      <PlanCalendarView
        plan={null}
        isLoading={false}
        isGenerating
        isEmpty={false}
      />,
    );

    expect(screen.getByText(/AI is building your weekly program/i)).toBeInTheDocument();
  });
});

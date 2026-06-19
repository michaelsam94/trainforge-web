import { describe, expect, it } from "vitest";
import { calculateWeeklyAdherence } from "./calculateWeeklyAdherence";

describe("calculateWeeklyAdherence", () => {
  it("counts sessions within the week window", () => {
    const weekStart = new Date("2026-06-16T00:00:00.000Z");
    const result = calculateWeeklyAdherence(
      [
        "2026-06-16T10:00:00.000Z",
        "2026-06-17T10:00:00.000Z",
        "2026-06-24T10:00:00.000Z",
      ],
      weekStart,
    );

    expect(result.completed).toBe(2);
    expect(result.total).toBe(7);
    expect(result.percent).toBe(29);
  });
});

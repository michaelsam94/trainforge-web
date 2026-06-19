/**
 * Pure domain: weekly adherence from completed workout dates.
 * Framework-agnostic — no React, no fetch.
 */
export function calculateWeeklyAdherence(
  completedDates: string[],
  weekStart: Date,
): { completed: number; total: number; percent: number } {
  const total = 7;
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const completed = completedDates.filter((iso) => {
    const date = new Date(iso);
    return date >= weekStart && date < weekEnd;
  }).length;

  const percent = Math.round((completed / total) * 100);

  return { completed, total, percent };
}

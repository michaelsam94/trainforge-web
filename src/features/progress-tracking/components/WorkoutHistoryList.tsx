"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { format } from "date-fns";
import type { WorkoutHistoryItem } from "@/features/progress-tracking/types";

type WorkoutHistoryListProps = {
  items: WorkoutHistoryItem[];
};

const ROW_HEIGHT = 72;

export function WorkoutHistoryList({ items }: WorkoutHistoryListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const useVirtual = items.length > 50;

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    enabled: useVirtual,
  });

  if (items.length === 0) {
    return (
      <p className="rounded-[var(--radius-md)] bg-card px-4 py-6 text-sm text-muted">
        No completed workouts yet. Finish a session to see your history here.
      </p>
    );
  }

  if (!useVirtual) {
    return (
      <ul className="divide-y divide-[var(--border)] rounded-[var(--radius-md)] border border-[var(--border)] bg-card">
        {items.map((item) => (
          <HistoryRow key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-96 overflow-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-card"
      aria-label="Workout history"
    >
      <ul
        style={{
          height: `${String(virtualizer.getTotalSize())}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          if (!item) return null;

          return (
            <li
              key={item.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${String(virtualRow.size)}px`,
                transform: `translateY(${String(virtualRow.start)}px)`,
              }}
              className="border-b border-[var(--border)]"
            >
              <HistoryRow item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HistoryRow({ item }: { item: WorkoutHistoryItem }) {
  const completedLabel = format(new Date(item.completedAt), "MMM d, yyyy");

  return (
    <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 py-3">
      <div>
        <p className="font-medium text-foreground">{item.title}</p>
        <p className="text-sm text-muted">{completedLabel}</p>
      </div>
      <div className="text-right text-sm text-muted">
        <p>{item.setCount} sets</p>
        {item.difficultyRating ? <p>Difficulty {item.difficultyRating}/5</p> : null}
      </div>
    </div>
  );
}

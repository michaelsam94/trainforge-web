"use client";

import Link from "next/link";
import { useVirtualizer } from "@tanstack/react-virtual";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import type { ForumThread } from "@/features/community/types";

type ThreadListProps = {
  threads: ForumThread[];
};

const ROW_HEIGHT = 88;

export function ThreadList({ threads }: ThreadListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const useVirtual = threads.length > 20;

  const virtualizer = useVirtualizer({
    count: threads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    enabled: useVirtual,
  });

  if (threads.length === 0) {
    return (
      <p className="rounded-[var(--radius-md)] border border-border bg-card px-4 py-8 text-center text-sm text-muted">
        No threads yet. Start the first conversation.
      </p>
    );
  }

  if (!useVirtual) {
    return (
      <ul className="divide-y divide-border rounded-[var(--radius-md)] border border-border bg-card">
        {threads.map((thread) => (
          <ThreadRow key={thread.id} thread={thread} />
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[32rem] overflow-auto rounded-[var(--radius-md)] border border-border bg-card"
      aria-label="Community threads"
    >
      <ul
        style={{
          height: `${String(virtualizer.getTotalSize())}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const thread = threads[virtualRow.index];
          if (!thread) return null;

          return (
            <li
              key={thread.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${String(virtualRow.size)}px`,
                transform: `translateY(${String(virtualRow.start)}px)`,
              }}
              className="border-b border-border"
            >
              <ThreadRow thread={thread} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ThreadRow({ thread }: { thread: ForumThread }) {
  const updatedLabel = formatDistanceToNow(new Date(thread.updatedAt), { addSuffix: true });

  return (
    <Link
      href={`/community/${thread.id}`}
      className="flex min-h-[88px] flex-col justify-center gap-1 px-4 py-3 transition hover:bg-card/80"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-medium text-foreground">{thread.title}</h2>
        <span className="shrink-0 text-xs text-muted">{updatedLabel}</span>
      </div>
      <p className="line-clamp-1 text-sm text-muted">{thread.body}</p>
      <p className="text-xs text-muted">
        {thread.authorDisplayName} · {String(thread.replyCount)} replies
      </p>
    </Link>
  );
}

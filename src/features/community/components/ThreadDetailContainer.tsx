"use client";

import Link from "next/link";
import { Skeleton } from "@/shared/ui";
import { ThreadDetailView } from "@/features/community/components/ThreadDetailView";
import { useThread } from "@/features/community/hooks/useCommunity";

type ThreadDetailContainerProps = {
  threadId: string;
};

export function ThreadDetailContainer({ threadId }: ThreadDetailContainerProps) {
  const { data: thread, isLoading, isError } = useThread(threadId);

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-[var(--radius-md)]" />;
  }

  if (isError || !thread) {
    return (
      <div className="rounded-[var(--radius-md)] border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted">Thread not found.</p>
        <Link href="/community" className="mt-3 inline-block text-sm text-brand-600 underline">
          Back to community
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link href="/community" className="mb-4 inline-block text-sm text-muted hover:text-foreground">
        ← Back to community
      </Link>
      <ThreadDetailView thread={thread} />
    </>
  );
}

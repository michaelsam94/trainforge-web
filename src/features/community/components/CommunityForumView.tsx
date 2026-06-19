"use client";

import { useRouter } from "next/navigation";
import { Skeleton } from "@/shared/ui";
import { CreateThreadForm } from "@/features/community/components/CreateThreadForm";
import { ThreadList } from "@/features/community/components/ThreadList";
import { useThreads } from "@/features/community/hooks/useCommunity";

export function CommunityForumView() {
  const router = useRouter();
  const { data: threads, isLoading, isError } = useThreads();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section>
        <h2 className="font-display text-lg font-bold">Recent threads</h2>
        <div className="mt-4">
          {isLoading ? (
            <Skeleton className="h-40 w-full rounded-[var(--radius-md)]" />
          ) : isError ? (
            <p className="text-sm text-error">Could not load threads.</p>
          ) : (
            <ThreadList threads={threads ?? []} />
          )}
        </div>
      </section>

      <aside>
        <CreateThreadForm
          onCreated={(threadId) => {
            router.push(`/community/${threadId}`);
          }}
        />
      </aside>
    </div>
  );
}

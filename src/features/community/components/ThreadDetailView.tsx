"use client";

import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/shared/ui";
import type { ForumThreadDetail } from "@/features/community/types";
import { useCreatePostMutation } from "@/features/community/hooks/useCommunity";

type ThreadDetailViewProps = {
  thread: ForumThreadDetail;
};

export function ThreadDetailView({ thread }: ThreadDetailViewProps) {
  const [reply, setReply] = useState("");
  const createPost = useCreatePostMutation(thread.id);
  const locked = thread.moderationFlag === "locked";

  return (
    <div className="space-y-6">
      <article className="rounded-[var(--radius-md)] border border-border bg-card p-5">
        <h1 className="font-display text-2xl font-bold">{thread.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {thread.authorDisplayName} ·{" "}
          {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
        </p>
        <p className="mt-4 whitespace-pre-wrap text-foreground">{thread.body}</p>
      </article>

      <section aria-label="Replies">
        <h2 className="font-display text-lg font-bold">
          Replies ({String(thread.posts.length)})
        </h2>
        <ul className="mt-3 space-y-3">
          {thread.posts.map((post) => (
            <li key={post.id} className="rounded-[var(--radius-md)] border border-border bg-card p-4">
              <p className="text-sm text-muted">
                {post.authorDisplayName} ·{" "}
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-foreground">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {locked ? (
        <p className="text-sm text-muted">This thread is locked and no longer accepts replies.</p>
      ) : (
        <form
          className="rounded-[var(--radius-md)] border border-border bg-card p-4"
          onSubmit={(event) => {
            event.preventDefault();
            void createPost.mutateAsync({ body: reply }).then(() => {
              setReply("");
            });
          }}
        >
          <label className="block text-sm font-medium text-foreground">
            Reply
            <textarea
              value={reply}
              onChange={(event) => {
                setReply(event.target.value);
              }}
              required
              rows={4}
              maxLength={4000}
              className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <Button type="submit" className="mt-4" loading={createPost.isPending}>
            Post reply
          </Button>
        </form>
      )}
    </div>
  );
}

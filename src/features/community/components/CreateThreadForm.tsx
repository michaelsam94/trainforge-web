"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";
import { useCreateThreadMutation } from "@/features/community/hooks/useCommunity";

type CreateThreadFormProps = {
  onCreated?: (threadId: string) => void;
};

export function CreateThreadForm({ onCreated }: CreateThreadFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const createThread = useCreateThreadMutation();

  return (
    <form
      className="rounded-[var(--radius-md)] border border-border bg-card p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void createThread.mutateAsync({ title, body }).then((result) => {
          setTitle("");
          setBody("");
          onCreated?.(result.thread.id);
        });
      }}
    >
      <h2 className="font-display text-lg font-bold">Start a thread</h2>
      <div className="mt-4 space-y-3">
        <Input
          label="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
          minLength={3}
          maxLength={120}
        />
        <label className="block text-sm font-medium text-foreground">
          Message
          <textarea
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            required
            rows={4}
            maxLength={4000}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>
      <Button type="submit" className="mt-4" loading={createThread.isPending}>
        Post thread
      </Button>
    </form>
  );
}

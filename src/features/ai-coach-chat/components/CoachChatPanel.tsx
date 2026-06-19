"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button, Skeleton } from "@/shared/ui";
import { ChatMessageBubble } from "@/features/ai-coach-chat/components/ChatMessageBubble";
import { OfflineBlocker } from "@/features/ai-coach-chat/components/OfflineBlocker";
import { useFocusTrap } from "@/features/ai-coach-chat/hooks/useFocusTrap";
import { useOnlineStatus } from "@/features/ai-coach-chat/hooks/useOnlineStatus";
import type { ChatMessageDto } from "@/features/ai-coach-chat/types";

type CoachChatPanelProps = {
  messages: ChatMessageDto[];
  isLoading: boolean;
  isStreaming: boolean;
  streamingText: string;
  liveAnnouncement: string;
  errorMessage: string | null;
  onSend: (content: string) => Promise<void>;
  onCancel: () => void;
};

export function CoachChatPanel({
  messages,
  isLoading,
  isStreaming,
  streamingText,
  liveAnnouncement,
  errorMessage,
  onSend,
  onCancel,
}: CoachChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const online = useOnlineStatus();
  const composerId = useId();
  useFocusTrap(panelRef, true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || !online || isStreaming) return;
    const content = draft;
    setDraft("");
    await onSend(content);
    inputRef.current?.focus();
  }

  return (
    <div className="mt-6 flex min-h-[60dvh] flex-1 flex-col gap-4">
      <OfflineBlocker online={online} />

      <div className="flex-1 space-y-4 overflow-y-auto pb-4" aria-live="off">
        {isLoading ? (
          <Skeleton className="h-24 rounded-[var(--radius-md)]" />
        ) : (
          messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))
        )}

        {isStreaming && streamingText ? (
          <ChatMessageBubble
            message={{ role: "assistant", contentPlain: streamingText }}
            streaming
          />
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </p>

      {errorMessage ? (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      ) : null}

      <div
        ref={panelRef}
        className="sticky bottom-0 rounded-[var(--radius-lg)] border border-border bg-card p-4"
      >
        <form onSubmit={(event) => void handleSubmit(event)} className="flex flex-col gap-3">
          <label htmlFor={composerId} className="sr-only">
            Message your AI coach
          </label>
          <textarea
            ref={inputRef}
            id={composerId}
            rows={3}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
            }}
            disabled={!online || isStreaming}
            placeholder="Ask about training adjustments, recovery, or motivation…"
            className="min-h-12 w-full resize-none rounded-[var(--radius-sm)] border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          />
          <div className="flex items-center justify-end gap-2">
            {isStreaming ? (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
            <Button type="submit" disabled={!online || isStreaming || !draft.trim()}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { cn } from "@/shared/lib/cn";
import type { ChatMessageDto } from "@/features/ai-coach-chat/types";

type ChatMessageBubbleProps = {
  message: Pick<ChatMessageDto, "role" | "contentPlain">;
  streaming?: boolean;
};

export function ChatMessageBubble({ message, streaming = false }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "max-w-[85%] rounded-[var(--radius-md)] border px-4 py-3 text-sm",
        isAssistant
          ? "mr-auto border-accent-400/30 bg-accent-400/10"
          : "ml-auto border-border bg-background",
      )}
    >
      {isAssistant ? (
        <p className="mb-2 text-xs font-medium text-accent-600 dark:text-accent-400">AI Coach</p>
      ) : null}
      <p className="whitespace-pre-wrap text-foreground">
        {message.contentPlain}
        {streaming ? <span aria-hidden="true">▍</span> : null}
      </p>
    </div>
  );
}

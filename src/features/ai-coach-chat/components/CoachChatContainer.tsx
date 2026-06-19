"use client";

import { CoachChatPanel } from "@/features/ai-coach-chat/components/CoachChatPanel";
import { useCoachChat } from "@/features/ai-coach-chat/hooks/useCoachChat";

export function CoachChatContainer() {
  const chat = useCoachChat();

  return (
    <CoachChatPanel
      messages={chat.messages}
      isLoading={chat.isLoading}
      isStreaming={chat.isStreaming}
      streamingText={chat.streamingText}
      liveAnnouncement={chat.liveAnnouncement}
      errorMessage={chat.errorMessage}
      onSend={chat.sendMessage}
      onCancel={chat.cancelStream}
    />
  );
}

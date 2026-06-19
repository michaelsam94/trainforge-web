"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChatSession,
  fetchChatMessages,
  fetchChatSessions,
  streamChatMessage,
} from "@/features/ai-coach-chat/api/chatApi";
import type { ChatMessageDto } from "@/features/ai-coach-chat/types";

export const chatSessionsQueryKey = ["chat", "sessions"] as const;

export function chatMessagesQueryKey(sessionId: string) {
  return ["chat", "messages", sessionId] as const;
}

export function useCoachChat() {
  const queryClient = useQueryClient();
  const streamAbortRef = useRef<AbortController | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sessionsQuery = useQuery({
    queryKey: chatSessionsQueryKey,
    queryFn: fetchChatSessions,
  });

  useEffect(() => {
    if (sessionId || !sessionsQuery.isSuccess) return;

    const existing = sessionsQuery.data.sessions[0];
    if (existing) {
      setSessionId(existing.id);
      return;
    }

    void createChatSession()
      .then((created) => {
        setSessionId(created.session.id);
        return queryClient.invalidateQueries({ queryKey: chatSessionsQueryKey });
      })
      .catch(() => {
        setErrorMessage("Unable to start coach session");
      });
  }, [sessionId, sessionsQuery.isSuccess, sessionsQuery.data, queryClient]);

  const messagesQuery = useQuery({
    queryKey: sessionId ? chatMessagesQueryKey(sessionId) : ["chat", "messages", "none"],
    queryFn: () => fetchChatMessages(sessionId!),
    enabled: Boolean(sessionId),
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId || !content.trim()) return;

      streamAbortRef.current?.abort();
      const controller = new AbortController();
      streamAbortRef.current = controller;

      setErrorMessage(null);
      setStreamingText("");
      setIsStreaming(true);

      const optimisticUser: ChatMessageDto = {
        id: `temp-${String(Date.now())}`,
        sessionId,
        role: "user",
        content: content.trim(),
        contentPlain: content.trim(),
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(chatMessagesQueryKey(sessionId), (current: { messages: ChatMessageDto[] } | undefined) => ({
        messages: [...(current?.messages ?? []), optimisticUser],
      }));

      await streamChatMessage(
        sessionId,
        content.trim(),
        {
          onToken: (token) => {
            setStreamingText((previous) => previous + token);
          },
          onDone: (payload) => {
            queryClient.setQueryData(chatMessagesQueryKey(sessionId), (current: { messages: ChatMessageDto[] } | undefined) => {
              const withoutOptimistic = (current?.messages ?? []).filter(
                (message) => message.id !== optimisticUser.id,
              );
              return {
                messages: [...withoutOptimistic, payload.userMessage, payload.assistantMessage],
              };
            });
            setStreamingText("");
            setIsStreaming(false);
            setLiveAnnouncement(payload.assistantMessage.contentPlain);
          },
          onError: (message) => {
            setErrorMessage(message);
            setStreamingText("");
            setIsStreaming(false);
            void queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey(sessionId) });
          },
          onCancelled: () => {
            setStreamingText("");
            setIsStreaming(false);
            void queryClient.invalidateQueries({ queryKey: chatMessagesQueryKey(sessionId) });
          },
        },
        controller.signal,
      );
    },
    [queryClient, sessionId],
  );

  const cancelStream = useCallback(() => {
    streamAbortRef.current?.abort();
    setStreamingText("");
    setIsStreaming(false);
  }, []);

  return {
    sessionId,
    messages: messagesQuery.data?.messages ?? [],
    isLoading: sessionsQuery.isLoading || messagesQuery.isLoading || !sessionId,
    isStreaming,
    streamingText,
    liveAnnouncement,
    errorMessage,
    sendMessage,
    cancelStream,
  };
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createThread,
  fetchThread,
  fetchThreads,
} from "@/features/community/api/communityApi";
import type { CreatePostPayload, CreateThreadPayload } from "@/features/community/types";

export const threadsQueryKey = ["community", "threads"] as const;

export function threadQueryKey(threadId: string) {
  return ["community", "thread", threadId] as const;
}

export function useThreads() {
  return useQuery({
    queryKey: threadsQueryKey,
    queryFn: () => fetchThreads(),
    select: (data) => data.threads,
  });
}

export function useThread(threadId: string) {
  return useQuery({
    queryKey: threadQueryKey(threadId),
    queryFn: () => fetchThread(threadId),
    select: (data) => data.thread,
    enabled: Boolean(threadId),
  });
}

export function useCreateThreadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateThreadPayload) => createThread(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: threadsQueryKey });
    },
  });
}

export function useCreatePostMutation(threadId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(threadId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: threadQueryKey(threadId) });
      await queryClient.invalidateQueries({ queryKey: threadsQueryKey });
    },
  });
}

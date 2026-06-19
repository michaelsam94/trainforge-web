import { apiClient } from "@/shared/lib/apiClient";
import type {
  CreatePostPayload,
  CreatePostResponse,
  CreateThreadPayload,
  CreateThreadResponse,
  ThreadResponse,
  ThreadsResponse,
} from "@/features/community/types";

export async function fetchThreads(limit = 50, offset = 0): Promise<ThreadsResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  return apiClient.get<ThreadsResponse>(`/community/threads?${params.toString()}`);
}

export async function fetchThread(threadId: string): Promise<ThreadResponse> {
  return apiClient.get<ThreadResponse>(`/community/threads/${threadId}`);
}

export async function createThread(payload: CreateThreadPayload): Promise<CreateThreadResponse> {
  return apiClient.post<CreateThreadResponse>("/community/threads", payload);
}

export async function createPost(
  threadId: string,
  payload: CreatePostPayload,
): Promise<CreatePostResponse> {
  return apiClient.post<CreatePostResponse>(`/community/threads/${threadId}/posts`, payload);
}

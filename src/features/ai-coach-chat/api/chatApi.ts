function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)trainforge_csrf=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function resolveBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "/api";
  }
  return process.env.API_URL ?? "http://localhost:2020";
}

export async function parseSseResponse(
  response: Response,
  handlers: {
    onEvent: (event: string, data: string) => void;
  },
  signal?: AbortSignal,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Streaming response had no body");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let eventName = "message";
  let dataLines: string[] = [];

  const flush = () => {
    if (dataLines.length === 0) return;
    handlers.onEvent(eventName, dataLines.join("\n"));
    dataLines = [];
    eventName = "message";
  };

  for (;;) {
    if (signal?.aborted) {
      throw new DOMException("Stream aborted", "AbortError");
    }

    const { done, value } = await reader.read();
    if (done) {
      flush();
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line === "") {
        flush();
        continue;
      }
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
        continue;
      }
      if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).trimStart());
      }
    }
  }
}

export async function fetchChatSessions(): Promise<import("@/features/ai-coach-chat/types").ChatSessionsResponse> {
  const { apiClient } = await import("@/shared/lib/apiClient");
  return apiClient.get("/chat/sessions");
}

export async function createChatSession(
  title?: string,
): Promise<{ session: import("@/features/ai-coach-chat/types").ChatSessionDto }> {
  const { apiClient } = await import("@/shared/lib/apiClient");
  return apiClient.post("/chat/sessions", title ? { title } : {});
}

export async function fetchChatMessages(
  sessionId: string,
): Promise<import("@/features/ai-coach-chat/types").ChatMessagesResponse> {
  const { apiClient } = await import("@/shared/lib/apiClient");
  return apiClient.get(`/chat/sessions/${sessionId}/messages`);
}

export async function streamChatMessage(
  sessionId: string,
  content: string,
  handlers: import("@/features/ai-coach-chat/types").StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const baseUrl = resolveBaseUrl().replace(/\/$/, "");
  const headers = new Headers({ "Content-Type": "application/json" });
  const csrf = getCsrfToken();
  if (csrf) headers.set("X-CSRF-Token", csrf);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/sessions/${sessionId}/messages`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ content }),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      handlers.onCancelled();
      return;
    }
    handlers.onError("Network error — check your connection");
    return;
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    handlers.onError(payload?.error?.message ?? "Unable to send message");
    return;
  }

  await parseSseResponse(
    response,
    {
      onEvent: (event, data) => {
        if (event === "token") {
          const payload = JSON.parse(data) as { text?: string };
          if (payload.text) handlers.onToken(payload.text);
          return;
        }
        if (event === "done") {
          handlers.onDone(JSON.parse(data) as import("@/features/ai-coach-chat/types").StreamDonePayload);
          return;
        }
        if (event === "error") {
          const payload = JSON.parse(data) as { message?: string };
          handlers.onError(payload.message ?? "Streaming failed");
          return;
        }
        if (event === "cancelled") {
          handlers.onCancelled();
        }
      },
    },
    signal,
  );
}

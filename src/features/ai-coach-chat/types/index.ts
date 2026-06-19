export type ChatSessionDto = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessageDto = {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  contentPlain: string;
  createdAt: string;
};

export type ChatSessionsResponse = {
  sessions: ChatSessionDto[];
};

export type ChatMessagesResponse = {
  messages: ChatMessageDto[];
};

export type StreamDonePayload = {
  userMessage: ChatMessageDto;
  assistantMessage: ChatMessageDto;
};

export type StreamHandlers = {
  onToken: (text: string) => void;
  onDone: (payload: StreamDonePayload) => void;
  onError: (message: string) => void;
  onCancelled: () => void;
};

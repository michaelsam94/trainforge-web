export type ModerationFlag = "none" | "hidden" | "locked";

export type ForumThread = {
  id: string;
  authorId: string;
  authorDisplayName: string;
  title: string;
  body: string;
  moderationFlag: ModerationFlag;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ForumPost = {
  id: string;
  threadId: string;
  authorId: string;
  authorDisplayName: string;
  body: string;
  moderationFlag: "none" | "hidden";
  createdAt: string;
};

export type ForumThreadDetail = ForumThread & {
  posts: ForumPost[];
};

export type ThreadsResponse = {
  threads: ForumThread[];
};

export type ThreadResponse = {
  thread: ForumThreadDetail;
};

export type CreateThreadPayload = {
  title: string;
  body: string;
};

export type CreatePostPayload = {
  body: string;
};

export type CreateThreadResponse = {
  thread: ForumThread;
};

export type CreatePostResponse = {
  post: ForumPost;
};

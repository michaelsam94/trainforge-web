"use client";

import { CommunityForumView } from "@/features/community/components/CommunityForumView";

export default function CommunityPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <h1 className="font-display text-2xl font-bold">Community</h1>
      <p className="mt-1 text-sm text-muted">Forums, milestones, and training discussions</p>
      <div className="mt-8">
        <CommunityForumView />
      </div>
    </main>
  );
}

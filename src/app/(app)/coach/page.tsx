"use client";

import { GatedCoachChatContainer } from "@/features/billing/components/GatedCoachChatContainer";

export default function CoachPage() {
  return (
    <main id="main-content" className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
      <h1 className="font-display text-2xl font-bold">AI Coach</h1>
      <p className="mt-1 text-sm text-muted">
        Not a substitute for medical advice. Coaching context only.
      </p>
      <GatedCoachChatContainer />
    </main>
  );
}

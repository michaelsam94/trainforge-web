"use client";

import { SerwistProvider } from "@serwist/next/react";
import type { ReactNode } from "react";
import { useOfflineSync } from "@/features/offline-sync/hooks/useOfflineSync";

function OfflineStatusBanner() {
  const { online, queueLength, isSyncing, lastSyncError } = useOfflineSync();

  if (online && queueLength === 0 && !lastSyncError) return null;

  const message = !online
    ? "You are offline — today's plan and logged sets are saved locally."
    : isSyncing
      ? "Syncing offline workout logs…"
      : queueLength > 0
        ? `${String(queueLength)} workout action${queueLength === 1 ? "" : "s"} waiting to sync`
        : lastSyncError;

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-border bg-card px-4 py-2 text-center text-sm text-muted"
    >
      {message}
    </div>
  );
}

export function PwaProvider({ children }: { children: ReactNode }) {
  return (
    <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV === "development"} reloadOnOnline>
      <OfflineStatusBanner />
      {children}
    </SerwistProvider>
  );
}

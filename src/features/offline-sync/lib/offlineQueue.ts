import type { OfflineSyncEntry } from "@/features/offline-sync/types";

const STORAGE_KEY = "trainforge-offline-queue";

function readRaw(): OfflineSyncEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OfflineSyncEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRaw(entries: OfflineSyncEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function readOfflineQueue(): OfflineSyncEntry[] {
  return readRaw();
}

export function getOfflineQueueLength(): number {
  return readRaw().length;
}

export function enqueueOfflineEntry(entry: OfflineSyncEntry): void {
  const queue = readRaw();
  if (queue.some((item) => item.clientId === entry.clientId)) return;
  queue.push(entry);
  writeRaw(queue);
}

export function removeOfflineEntries(clientIds: string[]): void {
  if (clientIds.length === 0) return;
  const ids = new Set(clientIds);
  writeRaw(readRaw().filter((entry) => !ids.has(entry.clientId)));
}

export function clearOfflineQueue(): void {
  localStorage.removeItem(STORAGE_KEY);
}

type OfflineBlockerProps = {
  online: boolean;
};

export function OfflineBlocker({ online }: OfflineBlockerProps) {
  if (online) return null;

  return (
    <div
      role="status"
      className="rounded-[var(--radius-md)] border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-foreground"
    >
      You&apos;re offline. Reconnect to send messages to your AI coach.
    </div>
  );
}

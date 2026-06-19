import { AppNav } from "@/shared/ui";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <AppNav />
      <div className="flex min-h-dvh flex-1 flex-col pb-20 md:pb-0">
        {children}
      </div>
    </div>
  );
}

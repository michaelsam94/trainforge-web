import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 py-4">
        <Link href="/" className="font-display text-lg font-bold">
          TrainForge
        </Link>
      </header>
      {children}
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { appConfig } from "@/shared/config/app";
import { buildOrganizationJsonLd } from "@/features/marketing/seo/jsonLd";

export const metadata: Metadata = {
  openGraph: {
    siteName: appConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <div className="min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-display text-xl font-bold">
            TrainForge
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="Marketing">
            <Link href="/blog" className="text-muted hover:text-foreground">
              Blog
            </Link>
            <Link href="/coaches" className="text-muted hover:text-foreground">
              Coaches
            </Link>
            <Link href="/gear" className="text-muted hover:text-foreground">
              Gear
            </Link>
            <Link href="/pricing" className="text-muted hover:text-foreground">
              Pricing
            </Link>
            <Link href="/privacy" className="text-muted hover:text-foreground">
              Privacy
            </Link>
            <Link href="/login" className="font-medium text-muted">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-[var(--radius-sm)] bg-brand-400 px-4 py-2 font-medium text-white hover:bg-brand-600"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} TrainForge</p>
        <p className="mt-2 flex flex-wrap justify-center gap-4">
          <Link href="/pricing" className="underline-offset-4 hover:underline">
            Pricing
          </Link>
          <Link href="/blog" className="underline-offset-4 hover:underline">
            Blog
          </Link>
          <Link href="/coaches" className="underline-offset-4 hover:underline">
            Coaches
          </Link>
          <Link href="/gear" className="underline-offset-4 hover:underline">
            Gear
          </Link>
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
}

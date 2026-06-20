import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TrainForge collects, uses, and deletes your training data.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 19, 2026</p>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground">What we collect</h2>
          <p className="mt-2">
            Account details (email, display name), onboarding preferences, workout logs, AI chat
            transcripts, wearable metrics you connect, and account status.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">How we use data</h2>
          <p className="mt-2">
            We use your data to generate training plans, adapt workouts, provide coaching chat, and
            show progress analytics. We do not sell personal data.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">Health data</h2>
          <p className="mt-2">
            Workout logs and wearable metrics are treated as sensitive health-related data. They are
            stored encrypted at rest in Cloudflare D1 and deleted when you delete your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">Account deletion</h2>
          <p className="mt-2">
            You can permanently delete your account from{" "}
            <Link href="/profile" className="text-brand-600 underline-offset-4 hover:underline">
              Profile settings
            </Link>
            . Deletion removes your user record and cascades to workouts, plans, chat, wearables, and
            community posts tied to your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about privacy? Email{" "}
            <a href="mailto:privacy@trainforge.com" className="text-brand-600 underline-offset-4 hover:underline">
              privacy@trainforge.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

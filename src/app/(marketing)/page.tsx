import { ArrowRight, Brain, LineChart, Watch } from "lucide-react";
import { Button, Card } from "@/shared/ui";

export default function LandingPage() {
  return (
    <main id="main-content">
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium text-brand-600">AI personal training</p>
            <h1 className="display mb-6 min-h-[1.1em] text-foreground">
              Coach-quality plans that adapt to your life
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted">
              TrainForge generates adaptive fitness and skills programs from your goals,
              wearable data, and performance — with a real-time AI coach when you need
              guidance mid-set.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/signup">
                Generate my plan
                <ArrowRight size={18} aria-hidden />
              </Button>
              <Button href="/pricing" variant="secondary">
                View pricing
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
            <Card>
              <Brain className="mb-3 text-accent-400" size={32} aria-hidden />
              <h2 className="mb-2 font-display text-lg font-bold">Adaptive AI plans</h2>
              <p className="text-sm text-muted">
                Weekly programs that re-plan from completed sessions, difficulty feedback,
                and recovery signals — not a static PDF.
              </p>
            </Card>
            <Card>
              <Watch className="mb-3 text-brand-400" size={32} aria-hidden />
              <h2 className="mb-2 font-display text-lg font-bold">Wearable-aware</h2>
              <p className="text-sm text-muted">
                Sync sleep, HRV, and activity from Fitbit and more. See exactly why today&apos;s
                intensity changed.
              </p>
            </Card>
            <Card>
              <LineChart className="mb-3 text-brand-400" size={32} aria-hidden />
              <h2 className="mb-2 font-display text-lg font-bold">Progress you can trust</h2>
              <p className="text-sm text-muted">
                Streaks, volume charts, and skill mastery — built for time-constrained
                professionals who need clarity, not noise.
              </p>
            </Card>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="font-display text-2xl font-bold">Learn & explore</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <h3 className="font-display text-lg font-bold">Blog</h3>
                <p className="mt-2 text-sm text-muted">
                  Adaptive training guides, recovery science, and home gym setup tips.
                </p>
                <Button href="/blog" variant="secondary" className="mt-4">
                  Read articles
                </Button>
              </Card>
              <Card>
                <h3 className="font-display text-lg font-bold">Coaches</h3>
                <p className="mt-2 text-sm text-muted">
                  Meet specialists who work with TrainForge adaptive programming.
                </p>
                <Button href="/coaches" variant="secondary" className="mt-4">
                  Browse coaches
                </Button>
              </Card>
              <Card>
                <h3 className="font-display text-lg font-bold">Gear picks</h3>
                <p className="mt-2 text-sm text-muted">
                  Curated equipment with transparent affiliate disclosures.
                </p>
                <Button href="/gear" variant="secondary" className="mt-4">
                  View gear
                </Button>
              </Card>
            </div>
          </div>
        </section>
    </main>
  );
}

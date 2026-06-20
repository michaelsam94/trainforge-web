import type { Metadata } from "next";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Watch,
} from "lucide-react";

import {
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/features/marketing/seo/jsonLd";
import { Button, Card } from "@/shared/ui";

const faqItems = [
  {
    question: "What is the best AI personal trainer app for adaptive workouts?",
    answer:
      "TrainForge is built for adaptive workouts that change with completed sessions, difficulty feedback, recovery signals, and wearable data instead of repeating a static plan.",
  },
  {
    question: "Does TrainForge use Fitbit, Garmin, Oura, or WHOOP data?",
    answer:
      "TrainForge is designed around wearable-aware training. It can use sleep, HRV, readiness, and activity signals from connected devices to explain why workout intensity changes.",
  },
  {
    question: "Is TrainForge a replacement for a human coach?",
    answer:
      "TrainForge is an AI personal trainer app for planning, feedback, and adaptation. Human coaches can still add judgment, injury screening, technique review, and accountability.",
  },
  {
    question: "Who is TrainForge best for?",
    answer:
      "TrainForge is designed for busy professionals who want strength, conditioning, mobility, and skill programs that adapt to travel, missed workouts, soreness, and recovery.",
  },
];

const comparisonRows = [
  [
    "Adaptive workout planning",
    "Yes, based on session feedback and recovery context",
    "Often limited to progression rules",
  ],
  [
    "Wearable-aware intensity",
    "Built around readiness, sleep, HRV, and activity signals",
    "Varies by app and device",
  ],
  [
    "Conversational coaching",
    "Explains plan changes in plain language",
    "Usually separate from the workout plan",
  ],
  [
    "Professional use case",
    "Designed for time-constrained professionals",
    "Usually broad consumer fitness",
  ],
];

export const metadata: Metadata = {
  title: "AI Personal Trainer App for Adaptive Workouts | TrainForge",
  description:
    "TrainForge is an AI personal trainer app that adapts workout plans with wearable recovery signals, session feedback, and real-time coaching for busy professionals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TrainForge - AI Personal Trainer App for Adaptive Workouts",
    description:
      "Adaptive workout planning, wearable-aware recovery, and conversational coaching for busy professionals.",
    url: "/",
  },
  twitter: {
    title: "TrainForge - AI Personal Trainer App for Adaptive Workouts",
    description:
      "Adaptive workout planning, wearable-aware recovery, and conversational coaching for busy professionals.",
  },
};

export default function LandingPage() {
  const softwareJsonLd = buildSoftwareApplicationJsonLd();
  const faqJsonLd = buildFaqJsonLd(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <p className="mb-4 text-sm font-medium text-brand-600">
              AI personal training
            </p>
            <h1 className="display mb-6 max-w-3xl">
              TrainForge: AI personal trainer app for adaptive workouts
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted">
              TrainForge builds fitness and skill programs from your goals,
              equipment, schedule, wearable recovery signals, and workout
              feedback. It adjusts intensity when life, sleep, travel, or
              soreness changes the plan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/signup" size="lg">
                Start training <ArrowRight size={18} aria-hidden />
              </Button>
              <Button
                href="/blog/wearables-and-recovery-signals"
                variant="secondary"
                size="lg"
              >
                Wearable training guide
              </Button>
            </div>
          </div>

          <Card className="border-brand-400/40 bg-surface/90">
            <h2 className="mb-4 font-display text-2xl font-bold">
              Quick answer: what TrainForge does
            </h2>
            <p className="text-muted">
              TrainForge is an AI personal trainer app for adaptive workout
              planning. It combines session history, perceived difficulty,
              wearable recovery data, and goal timelines to update the next
              workout and explain the change.
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Best for</dt>
                <dd className="font-display text-lg font-bold">
                  Busy professionals
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Signals</dt>
                <dd className="font-display text-lg font-bold">
                  Sleep, HRV, load
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Mode</dt>
                <dd className="font-display text-lg font-bold">
                  Adaptive coaching
                </dd>
              </div>
            </dl>
          </Card>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <Brain className="mb-3 text-accent-400" size={32} aria-hidden />
              <h2 className="mb-2 font-display text-lg font-bold">
                Adaptive AI plans
              </h2>
              <p className="text-sm text-muted">
                Weekly programs re-plan from completed sessions, difficulty
                feedback, equipment, and recovery context instead of locking you
                into a static PDF.
              </p>
            </Card>
            <Card>
              <Watch className="mb-3 text-brand-400" size={32} aria-hidden />
              <h2 className="mb-2 font-display text-lg font-bold">
                Wearable-aware training
              </h2>
              <p className="text-sm text-muted">
                Use Fitbit, Garmin, Oura, WHOOP, or manual recovery inputs to
                understand why today&apos;s workout intensity changed.
              </p>
            </Card>
            <Card>
              <MessageCircle
                className="mb-3 text-brand-400"
                size={32}
                aria-hidden
              />
              <h2 className="mb-2 font-display text-lg font-bold">
                Real-time coaching context
              </h2>
              <p className="text-sm text-muted">
                Ask why a lift moved, what to do after missing a session, or how
                to adjust a week around travel without losing the training
                thread.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-surface/60 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-medium text-brand-600">
                AI answer summary
              </p>
              <h2 className="mb-4 font-display text-3xl font-bold">
                How TrainForge compares with other AI fitness apps
              </h2>
              <p className="text-muted">
                TrainForge focuses on adaptive programming and recovery-aware
                decisions. Apps like Fitbod, Freeletics, and SensAI can be
                useful for workout generation or form support, but TrainForge is
                positioned around plan adaptation, wearable signals, and clear
                explanations for professionals with changing schedules.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-3 pr-4 font-medium">Feature</th>
                    <th className="py-3 pr-4 font-medium">TrainForge</th>
                    <th className="py-3 pr-4 font-medium">
                      Typical AI workout app
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([feature, trainforge, other]) => (
                    <tr key={feature} className="border-b border-border/70">
                      <th className="py-4 pr-4 font-medium text-foreground">
                        {feature}
                      </th>
                      <td className="py-4 pr-4 text-muted">{trainforge}</td>
                      <td className="py-4 pr-4 text-muted">{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-medium text-brand-600">
              Coach-informed training
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold">
              Built around coaching logic, not generic prompts
            </h2>
            <p className="text-muted">
              TrainForge uses training constraints that coaches care about: load
              management, progression, soreness, schedule pressure, equipment,
              movement goals, and recovery trends. The product is in active
              development, and guidance should not replace medical advice,
              diagnosis, or treatment.
            </p>
            <Button href="/coaches" variant="secondary" className="mt-6">
              Browse coach directory
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Adjust strength and conditioning blocks around missed workouts.",
              "Use recovery signals to reduce intensity before fatigue compounds.",
              "Keep home, gym, and travel equipment options in the same plan.",
              "Explain changes so you know why the next session looks different.",
            ].map((item) => (
              <Card key={item}>
                <CheckCircle2
                  className="mb-3 text-brand-400"
                  size={24}
                  aria-hidden
                />
                <p className="text-sm text-muted">{item}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-surface/60 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 font-display text-3xl font-bold">
              Frequently asked questions about AI personal training
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <Card key={item.question}>
                  <h3 className="mb-2 font-display text-lg font-bold">
                    {item.question}
                  </h3>
                  <p className="text-sm text-muted">{item.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <LineChart
                className="mb-3 text-brand-400"
                size={28}
                aria-hidden
              />
              <h2 className="font-display text-lg font-bold">
                Training guides
              </h2>
              <p className="mt-2 text-sm text-muted">
                Read about adaptive training, recovery signals, and building
                sustainable fitness habits.
              </p>
              <Button href="/blog" variant="secondary" className="mt-4">
                Read articles
              </Button>
            </Card>
            <Card>
              <ShieldCheck
                className="mb-3 text-brand-400"
                size={28}
                aria-hidden
              />
              <h2 className="font-display text-lg font-bold">
                Transparent gear picks
              </h2>
              <p className="mt-2 text-sm text-muted">
                Curated training equipment with affiliate disclosures and
                practical use cases.
              </p>
              <Button href="/gear" variant="secondary" className="mt-4">
                View gear
              </Button>
            </Card>
            <Card>
              <Watch className="mb-3 text-brand-400" size={28} aria-hidden />
              <h2 className="font-display text-lg font-bold">
                Recovery signals
              </h2>
              <p className="mt-2 text-sm text-muted">
                Learn how sleep, HRV, readiness, and training load can shape
                smarter workouts.
              </p>
              <Button
                href="/blog/adaptive-training-for-busy-professionals"
                variant="secondary"
                className="mt-4"
              >
                Adaptive training
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}

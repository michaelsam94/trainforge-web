"use client";

import { Button, Card, Input, PlanDaySkeleton, ProgressRing, Skeleton, useToast } from "@/shared/ui";
import { useTheme } from "@/app/providers";

export default function DesignSystemPage() {
  const { setTheme } = useTheme();
  const { toast } = useToast();

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="display mb-2">Design system</h1>
      <p className="mb-10 text-muted">TrainForge tokens and shared UI primitives.</p>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl font-bold">Theme</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setTheme("light")}>
            Light
          </Button>
          <Button variant="secondary" onClick={() => setTheme("dark")}>
            Dark
          </Button>
          <Button variant="secondary" onClick={() => setTheme("system")}>
            System
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl font-bold">Form</h2>
        <Card className="max-w-md">
          <Input label="Email" name="demo-email" type="email" hint="Used for login only." />
          <Input label="With error" name="demo-error" error="This field is required." />
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl font-bold">Feedback</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast("Plan updated", "success")}>Success toast</Button>
          <Button variant="secondary" onClick={() => toast("Wearable synced", "info")}>
            Info toast
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-8">
          <ProgressRing value={72} />
          <div className="flex gap-3">
            <Skeleton className="h-20 w-32" />
            <PlanDaySkeleton />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-bold">AI accent</h2>
        <Card className="max-w-md border-accent-400/30 bg-accent-400/10">
          <p className="text-xs font-medium text-accent-600">AI Coach</p>
          <p className="mt-2 text-sm">Accent styling reserved for AI-generated content.</p>
        </Card>
      </section>
    </main>
  );
}

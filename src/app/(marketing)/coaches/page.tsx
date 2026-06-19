import type { Metadata } from "next";
import { coaches } from "@/features/marketing/content/coaches";
import { Card } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Coaches directory",
  description: "Meet TrainForge-affiliated coaches specializing in adaptive training for busy athletes.",
  openGraph: {
    title: "TrainForge Coaches Directory",
    description: "Specialists in hybrid strength, recovery, and time-efficient programming.",
    type: "website",
  },
};

export default function CoachesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="display mb-4">Coaches directory</h1>
      <p className="mb-8 max-w-2xl text-muted">
        TrainForge-affiliated coaches who understand adaptive programming, wearable-informed recovery,
        and the constraints of real-world schedules.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {coaches.map((coach) => (
          <Card key={coach.id} className="p-6">
            <h2 className="font-display text-xl font-bold">{coach.name}</h2>
            <p className="mt-1 text-sm font-medium text-brand-600">{coach.specialty}</p>
            <p className="mt-3 text-sm text-muted">{coach.bio}</p>
            <p className="mt-4 text-xs text-muted">{coach.location}</p>
            <p className="mt-2 text-xs text-muted">{coach.certifications.join(" · ")}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}

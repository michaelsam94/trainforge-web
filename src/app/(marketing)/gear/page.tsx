import type { Metadata } from "next";
import { gearItems } from "@/features/marketing/content/gear";
import { Card } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Gear picks",
  description: "Curated home gym and recovery gear with transparent affiliate disclosures.",
  openGraph: {
    title: "TrainForge Gear Picks",
    description: "Equipment we recommend for adaptive home training.",
    type: "website",
  },
};

export default function GearPage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="display mb-4">Gear picks</h1>
      <p className="mb-4 max-w-2xl text-muted">
        Equipment we recommend for adaptive home training. Some links are affiliate links — see
        disclosures on each item.
      </p>
      <p className="mb-8 rounded-[var(--radius-sm)] border border-border bg-card px-4 py-3 text-sm text-muted">
        Affiliate disclosure: TrainForge may earn a commission if you purchase through links on this
        page. Recommendations are based on programming needs, not commission rates.
      </p>
      <div className="space-y-4">
        {gearItems.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">{item.category}</p>
                <h2 className="font-display text-xl font-bold">{item.name}</h2>
                <p className="mt-2 text-sm text-muted">{item.summary}</p>
                <p className="mt-3 text-xs text-muted">{item.affiliateDisclosure}</p>
              </div>
              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border border-border px-4 text-sm font-medium hover:bg-card"
              >
                View product
              </a>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

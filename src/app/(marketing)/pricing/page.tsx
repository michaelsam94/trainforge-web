import { Button, Card } from "@/shared/ui";
import { PricingTierButton } from "@/features/billing/components/PricingTierButton";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Manual plans from the exercise catalog",
    features: [
      "Catalog-based weekly plans",
      "Choose training body parts",
      "Workout logging",
      "Community read-only",
    ],
    checkoutTier: "free" as const,
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "Full adaptive planning + AI coach",
    features: [
      "AI plan generation & adaptation",
      "Streaming AI coach chat",
      "Progress dashboards",
    ],
    highlighted: true,
    checkoutTier: "pro" as const,
  },
  {
    name: "Premium",
    price: "$39/mo",
    description: "Priority AI + wearables + analytics",
    features: [
      "Everything in Pro",
      "Wearable integrations",
      "Priority coach responses",
      "Advanced analytics export",
    ],
    checkoutTier: "premium" as const,
  },
];

export default function PricingPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="display mb-4">Simple pricing</h1>
        <p className="text-muted">
          Start free. Upgrade when you want AI adaptation, coaching, and wearable sync.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.highlighted ? "border-brand-400 ring-1 ring-brand-400/30" : ""}
          >
            <h2 className="font-display text-xl font-bold">{tier.name}</h2>
            <p className="mt-2 text-3xl font-bold">{tier.price}</p>
            <p className="mt-2 text-sm text-muted">{tier.description}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <div className="mt-8">
              <PricingTierButton
                tier={tier.checkoutTier}
                highlighted={tier.highlighted}
                label={tier.checkoutTier === "free" ? "Start free" : `Choose ${tier.name}`}
              />
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Already training with us?{" "}
        <Button href="/login?redirect=/profile" variant="ghost" className="inline px-0">
          Manage subscription in profile
        </Button>
      </p>
    </main>
  );
}

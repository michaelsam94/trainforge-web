export type GearItem = {
  id: string;
  name: string;
  category: string;
  summary: string;
  affiliateUrl: string;
  affiliateDisclosure: string;
};

export const gearItems: GearItem[] = [
  {
    id: "adjustable-dumbbells",
    name: "Adjustable dumbbell set",
    category: "Strength",
    summary: "Covers most progressive overload needs in a small footprint for home gyms.",
    affiliateUrl: "https://example.com/gear/adjustable-dumbbells",
    affiliateDisclosure: "Affiliate link — TrainForge may earn a commission at no extra cost to you.",
  },
  {
    id: "recovery-sleep-tracker",
    name: "Sleep & recovery tracker",
    category: "Wearables",
    summary: "Pairs with TrainForge to feed sleep and HRV signals into adaptive planning.",
    affiliateUrl: "https://example.com/gear/sleep-tracker",
    affiliateDisclosure: "Affiliate link — TrainForge may earn a commission at no extra cost to you.",
  },
  {
    id: "resistance-bands",
    name: "Heavy resistance band kit",
    category: "Accessories",
    summary: "Useful for warm-ups, travel sessions, and joint-friendly accessory work.",
    affiliateUrl: "https://example.com/gear/resistance-bands",
    affiliateDisclosure: "Affiliate link — TrainForge may earn a commission at no extra cost to you.",
  },
];

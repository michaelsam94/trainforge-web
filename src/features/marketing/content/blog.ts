export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "adaptive-training-for-busy-professionals",
    title: "Adaptive training for busy professionals",
    description:
      "How AI-adjusted weekly plans help you stay consistent when meetings, travel, and sleep vary.",
    publishedAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-10T09:00:00.000Z",
    author: "TrainForge Coaching Team",
    readingMinutes: 6,
    tags: ["adaptation", "consistency", "planning"],
    body: [
      "Most training plans fail because they assume a perfectly repeatable week. Real life rarely cooperates.",
      "TrainForge re-plans from completed sessions, difficulty feedback, and recovery signals instead of treating your program like a static PDF.",
      "Start with two non-negotiable sessions per week, then let adaptation scale volume when recovery is strong and pull back when sleep or stress spikes.",
    ],
  },
  {
    slug: "wearables-and-recovery-signals",
    title: "Wearables and recovery signals that actually matter",
    description:
      "Sleep, HRV, and activity trends explained — and how they influence today's workout intensity.",
    publishedAt: "2026-06-08T09:00:00.000Z",
    updatedAt: "2026-06-08T09:00:00.000Z",
    author: "TrainForge Coaching Team",
    readingMinutes: 5,
    tags: ["wearables", "recovery", "hrv"],
    body: [
      "Not every wearable metric should change your workout. TrainForge prioritizes sleep duration, resting heart rate trends, and recent training load.",
      "When recovery is suppressed, the app lowers intensity transparently so you know exactly why today's session changed.",
      "Premium members can connect Fitbit today, with more providers on the roadmap.",
    ],
  },
  {
    slug: "building-a-coach-quality-home-gym",
    title: "Building a coach-quality home gym on a budget",
    description:
      "The minimum viable equipment list for strength, conditioning, and skill practice at home.",
    publishedAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-06-15T09:00:00.000Z",
    author: "TrainForge Coaching Team",
    readingMinutes: 7,
    tags: ["equipment", "home gym", "strength"],
    body: [
      "You do not need a full rack on day one. A pair of adjustable dumbbells, a pull-up bar, and a mat cover most beginner-to-intermediate programs.",
      "TrainForge onboarding captures available equipment so generated sessions never prescribe gear you do not own.",
      "Invest in versatile load before specialty machines — adaptation works best when sessions stay repeatable.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

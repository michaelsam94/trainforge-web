export const appConfig = {
  name: "TrainForge",
  description:
    "AI-driven personalized training — adaptive plans, wearable sync, and a real-time coach.",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:2021",
} as const;

export const navItems = [
  { href: "/plan", label: "Plan", icon: "calendar" as const },
  { href: "/exercises", label: "Exercises", icon: "dumbbell" as const },
  { href: "/progress", label: "Progress", icon: "chart" as const },
  { href: "/coach", label: "Coach", icon: "message" as const },
  { href: "/community", label: "Community", icon: "users" as const },
  { href: "/profile", label: "Profile", icon: "user" as const },
] as const;

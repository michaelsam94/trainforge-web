export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  onboardingCompleted: boolean;
  subscriptionTier: "free";
};

export type AuthResponse = {
  user: AuthUser;
};

export type MeResponse = AuthResponse;

export type OnboardingGoal = {
  type: "fitness" | "skill" | "hybrid";
  description: string;
  targetTimelineWeeks?: number;
};

export type OnboardingPayload = {
  goals: OnboardingGoal[];
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  equipment: string[];
  availableDays: number[];
  sessionMinutes: number;
  complete?: boolean;
};

export type OnboardingResponse = {
  user: AuthUser;
  onboarding: {
    userId: string;
    completedAt: string | null;
  };
};

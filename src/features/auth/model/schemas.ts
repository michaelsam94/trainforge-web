import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

export const goalSchema = z.object({
  type: z.enum(["fitness", "skill", "hybrid"]),
  description: z.string().min(3, "Describe your goal in a few words").max(500),
  targetTimelineWeeks: z.number().int().min(1).max(52).optional(),
});

export const onboardingStepGoalsSchema = z.object({
  goals: z.array(goalSchema).min(1, "Add at least one goal"),
});

export const onboardingStepLevelSchema = z.object({
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export const onboardingStepEquipmentSchema = z.object({
  equipment: z.array(z.string().min(1)).min(1, "Select at least one option"),
  sessionMinutes: z.number().int().min(15).max(180),
});

export const onboardingStepScheduleSchema = z.object({
  availableDays: z.array(z.number().int().min(0).max(6)).min(1, "Pick at least one day"),
});

export const onboardingSchema = z.object({
  goals: z.array(goalSchema).min(1, "Add at least one goal"),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  equipment: z.array(z.string().min(1)).min(1, "Select at least one option"),
  sessionMinutes: z.number().int().min(15).max(180),
  availableDays: z.array(z.number().int().min(0).max(6)).min(1, "Pick at least one day"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export const onboardingSteps = [
  { id: "goals", title: "Your goals" },
  { id: "level", title: "Current level" },
  { id: "equipment", title: "Equipment & time" },
  { id: "schedule", title: "Weekly schedule" },
] as const;

export const fitnessLevelOptions = [
  { value: "beginner", label: "Beginner", hint: "New or returning after a break" },
  { value: "intermediate", label: "Intermediate", hint: "Training consistently 6+ months" },
  { value: "advanced", label: "Advanced", hint: "Structured training 2+ years" },
] as const;

export const equipmentOptions = [
  "Bodyweight only",
  "Dumbbells",
  "Barbell",
  "Kettlebells",
  "Resistance bands",
  "Full gym",
] as const;

export const weekdayOptions = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 0, label: "Sun" },
] as const;

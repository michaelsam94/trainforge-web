"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/shared/lib/apiClient";
import { cn } from "@/shared/lib/cn";
import { Button, Card, Input } from "@/shared/ui";
import {
  equipmentOptions,
  fitnessLevelOptions,
  onboardingSchema,
  onboardingSteps,
  weekdayOptions,
  type OnboardingFormValues,
} from "@/features/auth/model/schemas";
import { useSaveOnboardingMutation } from "@/features/auth/hooks/useAuth";

const defaultValues: OnboardingFormValues = {
  goals: [{ type: "fitness", description: "", targetTimelineWeeks: 8 }],
  fitnessLevel: "beginner",
  equipment: ["Bodyweight only"],
  sessionMinutes: 45,
  availableDays: [1, 3, 5],
};

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const saveOnboarding = useSaveOnboardingMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues,
    mode: "onBlur",
  });

  const selectedEquipment = watch("equipment");
  const selectedDays = watch("availableDays");
  const fitnessLevel = watch("fitnessLevel");

  const toggleEquipment = (item: string) => {
    const next = selectedEquipment.includes(item)
      ? selectedEquipment.filter((value) => value !== item)
      : [...selectedEquipment, item];
    setValue("equipment", next, { shouldValidate: true });
  };

  const toggleDay = (day: number) => {
    const next = selectedDays.includes(day)
      ? selectedDays.filter((value) => value !== day)
      : [...selectedDays, day];
    setValue("availableDays", next, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (values: OnboardingFormValues) => {
    try {
      await saveOnboarding.mutateAsync({ ...values, complete: true });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to save onboarding. Please try again.";
      setError("root", { message });
    }
  });

  const stepError =
    step === 0
      ? errors.goals?.[0]?.description?.message ?? errors.goals?.message
      : step === 1
        ? errors.fitnessLevel?.message
        : step === 2
          ? errors.equipment?.message ?? errors.sessionMinutes?.message
          : errors.availableDays?.message;

  return (
    <main id="main-content" className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-display text-2xl font-bold">Let&apos;s build your plan</h1>
      <p className="mt-2 text-muted">
        Step {step + 1} of {onboardingSteps.length} — {onboardingSteps[step]?.title}
      </p>
      <ol className="mt-6 flex gap-2" aria-label="Onboarding progress">
        {onboardingSteps.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "h-1 flex-1 rounded-full",
              index <= step ? "bg-brand-400" : "bg-border",
            )}
            aria-label={`${item.title}${index === step ? " (current)" : ""}`}
          />
        ))}
      </ol>

      <Card className="mt-8 p-6">
        <form onSubmit={onSubmit} noValidate>
          {step === 0 ? (
            <div className="space-y-4">
              <label className="text-sm font-medium" htmlFor="goal-description">
                Primary goal
              </label>
              <textarea
                id="goal-description"
                className="min-h-28 w-full rounded-[var(--radius-sm)] border border-border bg-background px-4 py-3 text-base"
                placeholder="e.g. Build strength for hiking without joint pain"
                {...register("goals.0.description")}
              />
              <input type="hidden" value="fitness" {...register("goals.0.type")} />
              <Input
                label="Target timeline (weeks)"
                type="number"
                inputMode="numeric"
                error={errors.goals?.[0]?.targetTimelineWeeks?.message}
                {...register("goals.0.targetTimelineWeeks", { valueAsNumber: true })}
              />
            </div>
          ) : null}

          {step === 1 ? (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Current fitness level</legend>
              {fitnessLevelOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer flex-col rounded-[var(--radius-sm)] border px-4 py-3",
                    fitnessLevel === option.value
                      ? "border-brand-400 bg-brand-50 dark:bg-brand-900/20"
                      : "border-border",
                  )}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      value={option.value}
                      className="size-4"
                      {...register("fitnessLevel")}
                    />
                    {option.label}
                  </span>
                  <span className="mt-1 text-sm text-muted">{option.hint}</span>
                </label>
              ))}
            </fieldset>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Available equipment</legend>
                <div className="flex flex-wrap gap-2">
                  {equipmentOptions.map((item) => {
                    const active = selectedEquipment.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        className={cn(
                          "min-h-11 rounded-[var(--radius-full)] border px-4 text-sm",
                          active
                            ? "border-brand-400 bg-brand-50 text-brand-900 dark:bg-brand-900/20 dark:text-brand-100"
                            : "border-border text-muted",
                        )}
                        aria-pressed={active}
                        onClick={() => toggleEquipment(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <Input
                label="Typical session length (minutes)"
                type="number"
                inputMode="numeric"
                error={errors.sessionMinutes?.message}
                {...register("sessionMinutes", { valueAsNumber: true })}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <fieldset>
              <legend className="mb-3 text-sm font-medium">Which days can you train?</legend>
              <div className="flex flex-wrap gap-2">
                {weekdayOptions.map((day) => {
                  const active = selectedDays.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      className={cn(
                        "min-h-11 min-w-14 rounded-[var(--radius-sm)] border text-sm font-medium",
                        active
                          ? "border-brand-400 bg-brand-50 text-brand-900 dark:bg-brand-900/20 dark:text-brand-100"
                          : "border-border text-muted",
                      )}
                      aria-pressed={active}
                      onClick={() => toggleDay(day.value)}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          <div className="mt-4 min-h-5">
            {stepError ? (
              <p className="text-sm text-error" role="alert">
                {stepError}
              </p>
            ) : null}
            {errors.root?.message ? (
              <p className="text-sm text-error" role="alert">
                {errors.root.message}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex gap-3">
            {step > 0 ? (
              <Button type="button" variant="secondary" onClick={() => setStep((value) => value - 1)}>
                Back
              </Button>
            ) : null}
            {step < onboardingSteps.length - 1 ? (
              <Button
                type="button"
                className="flex-1"
                onClick={() => setStep((value) => value + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" className="flex-1" loading={saveOnboarding.isPending}>
                Generate my plan
              </Button>
            )}
          </div>
        </form>
      </Card>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/shared/lib/apiClient";
import { Button, Card, Input } from "@/shared/ui";
import { signupSchema, type SignupFormValues } from "@/features/auth/model/schemas";
import { useRegisterMutation } from "@/features/auth/hooks/useAuth";

export function SignupForm() {
  const registerUser = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { displayName: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser.mutateAsync(values);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to create your account. Please try again.";
      setError("root", { message });
    }
  });

  return (
    <Card className="p-6">
      <h1 className="font-display text-2xl font-bold">Start forging your plan</h1>
      <p className="mt-2 text-sm text-muted">
        Create an account to generate your personalized program.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          label="Name"
          autoComplete="name"
          error={errors.displayName?.message}
          {...register("displayName")}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          hint="At least 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.root?.message ? (
          <p className="text-sm text-error" role="alert">
            {errors.root.message}
          </p>
        ) : null}
        <Button type="submit" className="w-full" loading={registerUser.isPending}>
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already training with us?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-600 underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </Card>
  );
}

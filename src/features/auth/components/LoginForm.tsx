"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/shared/lib/apiClient";
import { Button, Card, Input } from "@/shared/ui";
import { loginSchema, type LoginFormValues } from "@/features/auth/model/schemas";
import { useLoginMutation } from "@/features/auth/hooks/useAuth";

export function LoginForm() {
  const login = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to log in. Please try again.";
      setError("root", { message });
    }
  });

  return (
    <Card className="p-6">
      <h1 className="font-display text-2xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Log in to continue your training plan.</p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.root?.message ? (
          <p className="text-sm text-error" role="alert">
            {errors.root.message}
          </p>
        ) : null}
        <Button type="submit" className="w-full" loading={login.isPending}>
          Log in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        No account?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand-600 underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}

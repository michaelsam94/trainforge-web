"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError } from "@/shared/lib/apiClient";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  saveOnboarding,
} from "@/features/auth/api/authApi";
import type { AuthUser, OnboardingPayload } from "@/features/auth/types";
import type { LoginFormValues, SignupFormValues } from "@/features/auth/model/schemas";

export const authQueryKey = ["auth", "me"] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKey,
    queryFn: async () => {
      try {
        return await fetchCurrentUser();
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 60_000,
  });
}

function redirectAfterAuth(user: AuthUser, router: ReturnType<typeof useRouter>) {
  if (!user.onboardingCompleted) {
    router.push("/onboarding");
    return;
  }
  router.push("/plan");
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (input: LoginFormValues) => loginUser(input),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueryKey, data);
      const redirect = searchParams.get("redirect");
      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
        return;
      }
      redirectAfterAuth(data.user, router);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: SignupFormValues) => registerUser(input),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueryKey, data);
      router.push("/onboarding");
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKey, null);
      queryClient.removeQueries({ queryKey: authQueryKey });
      router.push("/login");
    },
  });
}

export function useSaveOnboardingMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: OnboardingPayload) => saveOnboarding(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueryKey, { user: data.user });
      if (data.user.onboardingCompleted) {
        router.push("/plan?generate=1");
      }
    },
  });
}

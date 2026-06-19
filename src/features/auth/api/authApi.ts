import { apiClient } from "@/shared/lib/apiClient";
import type {
  AuthResponse,
  MeResponse,
  OnboardingPayload,
  OnboardingResponse,
} from "@/features/auth/types";
import type { LoginFormValues, SignupFormValues } from "@/features/auth/model/schemas";

export async function registerUser(input: SignupFormValues): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/register", input);
}

export async function loginUser(input: LoginFormValues): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/login", input);
}

export async function logoutUser(): Promise<void> {
  await apiClient.post<void>("/auth/logout");
}

export async function fetchCurrentUser(): Promise<MeResponse> {
  return apiClient.get<MeResponse>("/auth/me");
}

export async function saveOnboarding(payload: OnboardingPayload): Promise<OnboardingResponse> {
  return apiClient.post<OnboardingResponse>("/auth/onboarding", payload);
}

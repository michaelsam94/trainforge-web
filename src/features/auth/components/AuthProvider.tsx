"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import type { AuthUser } from "@/features/auth/types";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch, isError } = useCurrentUser();

  const value = useMemo<AuthContextValue>(
    () => ({
      user: isError ? null : (data?.user ?? null),
      isLoading,
      isAuthenticated: Boolean(data?.user),
      refetch: () => {
        void refetch();
      },
    }),
    [data?.user, isError, isLoading, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}

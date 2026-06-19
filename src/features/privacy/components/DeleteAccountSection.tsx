"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ApiError } from "@/shared/lib/apiClient";
import { Button, Card } from "@/shared/ui";
import { deleteAccount } from "@/features/privacy/api/privacyApi";
import { authQueryKey } from "@/features/auth/hooks/useAuth";

export function DeleteAccountSection() {
  const [confirmed, setConfirmed] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKey, null);
      queryClient.removeQueries({ queryKey: authQueryKey });
      router.replace("/");
    },
  });

  const errorMessage =
    deleteMutation.error instanceof ApiError
      ? deleteMutation.error.message
      : deleteMutation.error
        ? "Unable to delete your account. Please try again."
        : null;

  return (
    <Card className="border-error/30">
      <h2 className="font-display text-lg font-bold text-error">Delete account</h2>
      <p className="mt-2 text-sm text-muted">
        Permanently delete your account and all associated training data, including workout logs,
        plans, chat history, and wearable metrics. This action cannot be undone.
      </p>
      <p className="mt-2 text-sm text-muted">
        See our{" "}
        <Link href="/privacy" className="font-medium text-brand-600 underline-offset-4 hover:underline">
          privacy policy
        </Link>{" "}
        for details on data handling.
      </p>
      <label className="mt-4 flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-1"
        />
        <span>I understand this permanently deletes my account and health data.</span>
      </label>
      {errorMessage ? (
        <p className="mt-3 text-sm text-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button
        type="button"
        variant="destructive"
        className="mt-4"
        disabled={!confirmed || deleteMutation.isPending}
        loading={deleteMutation.isPending}
        onClick={() => deleteMutation.mutate()}
      >
        Delete my account
      </Button>
    </Card>
  );
}

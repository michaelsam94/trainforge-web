"use client";

import { LogOut } from "lucide-react";

import { useLogoutMutation } from "@/features/auth/hooks/useAuth";
import { Button, Card } from "@/shared/ui";

export function LogoutSection() {
  const logoutMutation = useLogoutMutation();

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-bold">Account session</h2>
          <p className="mt-2 text-sm text-muted">
            Sign out of this device and return to the login screen.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut size={18} aria-hidden />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </Card>
  );
}

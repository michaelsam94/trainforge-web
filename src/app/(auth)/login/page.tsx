import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

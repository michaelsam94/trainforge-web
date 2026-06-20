"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  Dumbbell,
  LogOut,
  MessageCircle,
  User,
  Users,
} from "lucide-react";

import { useLogoutMutation } from "@/features/auth/hooks/useAuth";
import { navItems } from "@/shared/config/app";
import { cn } from "@/shared/lib/cn";

const iconMap = {
  calendar: CalendarDays,
  dumbbell: Dumbbell,
  chart: BarChart3,
  message: MessageCircle,
  users: Users,
  user: User,
} as const;

export function AppNav() {
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card safe-bottom md:hidden"
        aria-label="Main navigation"
      >
        <ul className="flex items-stretch justify-around">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = pathname.startsWith(item.href);

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs",
                    active ? "text-brand-400" : "text-muted",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={20} aria-hidden />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop sidebar */}
      <nav
        className="hidden w-56 shrink-0 flex-col border-r border-border bg-card p-4 md:flex"
        aria-label="Main navigation"
      >
        <p className="mb-6 font-display text-lg font-bold text-foreground">
          TrainForge
        </p>
        <ul className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
                      : "text-muted hover:bg-background hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={20} aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="mt-4 flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-60"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut size={20} aria-hidden />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </>
  );
}

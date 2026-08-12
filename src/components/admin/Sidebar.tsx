"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Tags,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Cars", icon: Car },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Couldn't log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const NavList = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-gold-500 text-navy-950" : "text-paper/70 hover:bg-paper/5 hover:text-paper"
            )}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex h-16 items-center justify-between border-b border-paper/10 bg-navy-950 px-4 lg:hidden">
        <Logo tone="light" />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-paper"
          aria-label="Open admin menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full w-72 flex-col bg-navy-950 py-5">
            <div className="flex items-center justify-between px-4">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-paper"
                aria-label="Close admin menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-1 flex-col">{NavList}</div>
            <div className="flex flex-col gap-1 border-t border-paper/10 px-3 pt-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-paper/70 hover:bg-paper/5"
              >
                <ExternalLink className="h-[18px] w-[18px]" />
                View Site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-paper/70 hover:bg-paper/5 disabled:opacity-50"
              >
                <LogOut className="h-[18px] w-[18px]" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-paper/10 bg-navy-950 py-6 lg:flex">
        <div className="px-4">
          <Logo tone="light" />
        </div>
        <div className="mt-8 flex flex-1 flex-col">{NavList}</div>
        <div className="flex flex-col gap-1 border-t border-paper/10 px-3 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-paper/70 hover:bg-paper/5"
          >
            <ExternalLink className="h-[18px] w-[18px]" />
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-paper/70 hover:bg-paper/5 disabled:opacity-50"
          >
            <LogOut className="h-[18px] w-[18px]" />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}

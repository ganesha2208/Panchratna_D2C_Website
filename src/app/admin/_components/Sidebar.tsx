"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Inbox,
  ExternalLink,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type Item = { href: string; label: string; icon: LucideIcon };

const NAV: Item[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export function Sidebar({
  username,
  signOutAction,
}: {
  username: string;
  signOutAction: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <button
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
        <div className="font-display text-sm font-semibold tracking-tight text-gray-900">
          Panchratna Admin
        </div>
        <div className="w-9" />
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, fixed on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-5">
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-soft">
                <LayoutDashboard className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-gray-900">
                Panchratna
              </span>
            </Link>
            <button
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-2">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${active ? "text-brand-600" : "text-gray-400"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-3">
            <Link
              href="/"
              target="_blank"
              className="mb-2 flex items-center justify-between rounded-lg px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
            >
              View public site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Signed in as</div>
              <div className="mt-0.5 truncate text-sm font-medium text-gray-900">
                {username}
              </div>
              <div className="mt-2">{signOutAction}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

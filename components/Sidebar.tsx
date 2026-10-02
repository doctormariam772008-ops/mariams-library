"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "⌂" },
  { name: "My Library", href: "/dashboard/library", icon: "📚" },
  { name: "Favorites", href: "/dashboard/favorites", icon: "♡" },
  { name: "Discover", href: "/discover", icon: "✦" },
  { name: "Customize", href: "/dashboard/settings", icon: "🎨" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border-light bg-white md:flex md:flex-col">
      <div className="border-b border-border-light px-6 py-6">
        <Link href="/" className="block">
          <div className="text-lg font-bold text-text-primary">
            Mariam&apos;s Library
          </div>
          <div className="mt-1 text-xs text-text-secondary">
            Your knowledge. Your space.
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary hover:bg-secondary hover:text-text-primary"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border-light p-4">
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-sm font-semibold text-text-primary">
            Your Library
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Organize everything in one quiet space.
          </p>
        </div>
      </div>
    </aside>
  );
}

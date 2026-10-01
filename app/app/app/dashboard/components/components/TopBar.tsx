"use client";

import { useState } from "react";

export default function TopBar() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-10 border-b border-border-light bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex-1 md:ml-64">
          <div className="relative max-w-xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your library..."
              className="w-full rounded-xl border border-border-default bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary-light"
            />
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-semibold text-primary transition hover:bg-primary hover:text-white"
          aria-label="Profile"
        >
          M
        </button>
      </div>
    </header>
  );
}

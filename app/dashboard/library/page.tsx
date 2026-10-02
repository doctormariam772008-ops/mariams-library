"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Library = {
  id: string;
  name: string;
  description: string | null;
};

export default function LibraryPage() {
  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    loadLibrary();
  }, []);

  async function loadLibrary() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("libraries")
      .select("id, name, description")
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setLibrary(data);
      setName(data.name);
    }

    setLoading(false);
  }

  async function saveName() {
    if (!library || !supabase || !name.trim()) return;

    setSaving(true);

    const { data, error } = await supabase
      .from("libraries")
      .update({ name: name.trim() })
      .eq("id", library.id)
      .select("id, name, description")
      .single();

    if (!error && data) {
      setLibrary(data);
      setName(data.name);
      setEditing(false);
    }

    setSaving(false);
  }

  if (!supabase) {
    return (
      <main className="min-h-screen bg-bg-light px-6 py-10 md:ml-64">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-dashed border-border-default bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">⚠️</div>
            <h1 className="mt-4 text-2xl font-bold text-text-primary">
              Supabase is not configured
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
              values in your environment file to enable the library data.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-light px-6 py-10">
        <div className="mx-auto max-w-5xl text-text-secondary">
          Loading your library...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-light px-6 py-10 md:ml-64">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">My Library</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {editing ? (
              <>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                  className="rounded-xl border border-primary bg-white px-4 py-2 text-3xl font-bold text-text-primary outline-none"
                />

                <button
                  type="button"
                  onClick={saveName}
                  disabled={saving}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setName(library?.name ?? "");
                    setEditing(false);
                  }}
                  className="rounded-xl border border-border-default bg-white px-4 py-2 text-sm font-medium text-text-primary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-text-primary">
                  {library?.name || "My Library"}
                </h1>

                {library && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="rounded-xl border border-border-default bg-white px-3 py-2 text-sm font-medium text-text-primary hover:bg-secondary"
                  >
                    ✏️ Edit
                  </button>
                )}
              </>
            )}
          </div>

          <p className="mt-2 text-text-secondary">
            Organize your folders, documents, and pages here.
          </p>
        </div>

        {!library && (
          <div className="rounded-2xl border border-dashed border-border-default bg-white p-10 text-center">
            <div className="text-4xl">📚</div>
            <h2 className="mt-4 text-xl font-semibold text-text-primary">
              No library yet
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Your first library will appear here once it is created in
              Supabase.
            </p>
          </div>
        )}

        {library && (
          <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
            <div className="text-4xl">📚</div>

            <h2 className="mt-4 text-xl font-semibold text-text-primary">
              {library.name}
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              {library.description || "No description yet."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

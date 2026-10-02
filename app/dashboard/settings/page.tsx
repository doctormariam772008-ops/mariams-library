"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [backgroundColor, setBackgroundColor] = useState("#f8f7ff");
  const [primaryColor, setPrimaryColor] = useState("#6c4cff");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("appearance_settings")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (data) {
      setBackgroundColor(data.background_color || "#f8f7ff");
      setPrimaryColor(data.primary_color || "#6c4cff");
      setBackgroundImage(data.background_image || "");
      setTheme(data.theme || "light");
    }
  }

  async function saveSettings() {
    setSaving(true);
    setMessage("");

    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("appearance_settings")
      .upsert(
        {
          owner_id: user.id,
          background_color: backgroundColor,
          primary_color: primaryColor,
          background_image: backgroundImage || null,
          theme,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "owner_id",
        }
      );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Saved successfully ✨");
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-bg-light px-6 py-10 md:ml-64">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-primary">Customization</p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          🎨 Customize your library
        </h1>

        <p className="mt-2 text-text-secondary">
          Change the look of Mariam&apos;s Library and save your preferences.
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary">
              Background
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <input
                type="color"
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                className="h-12 w-16 cursor-pointer rounded-lg border-0"
              />

              <div>
                <p className="text-sm font-medium text-text-primary">
                  Background color
                </p>
                <p className="text-sm text-text-secondary">
                  {backgroundColor}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-text-primary">
                Background image URL
              </label>

              <input
                value={backgroundImage}
                onChange={(event) => setBackgroundImage(event.target.value)}
                placeholder="https://..."
                className="mt-2 w-full rounded-xl border border-border-default bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary">
              Colors
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <input
                type="color"
                value={primaryColor}
                onChange={(event) => setPrimaryColor(event.target.value)}
                className="h-12 w-16 cursor-pointer rounded-lg border-0"
              />

              <div>
                <p className="text-sm font-medium text-text-primary">
                  Primary color
                </p>
                <p className="text-sm text-text-secondary">
                  {primaryColor}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary">
              Theme
            </h2>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`rounded-xl px-5 py-3 text-sm font-medium ${
                  theme === "light"
                    ? "bg-primary text-white"
                    : "border border-border-default bg-white text-text-primary"
                }`}
              >
                ☀️ Light
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`rounded-xl px-5 py-3 text-sm font-medium ${
                  theme === "dark"
                    ? "bg-primary text-white"
                    : "border border-border-default bg-white text-text-primary"
                }`}
              >
                🌙 Dark
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message && (
            <p className="text-sm font-medium text-text-secondary">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

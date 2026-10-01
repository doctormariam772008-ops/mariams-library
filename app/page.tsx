export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-light px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-border-light bg-white p-10 shadow-sm">
          <p className="mb-3 text-sm font-medium text-primary">
            ✨ Your personal digital library
          </p>

          <h1 className="text-4xl font-bold text-text-primary">
            Welcome to Mariam&apos;s Library
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            Organize your libraries, folders, documents, pages, and knowledge
            in one beautiful place.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/dashboard"
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-dark"
            >
              Open My Library
            </a>

            <a
              href="#features"
              className="rounded-xl border border-border-default px-6 py-3 font-medium text-text-primary"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

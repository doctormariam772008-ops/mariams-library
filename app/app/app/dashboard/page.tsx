import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Sidebar />
      <TopBar />

      <main className="px-6 py-10 md:ml-64 md:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <p className="text-sm font-medium text-primary">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold text-text-primary">
              My Library
            </h1>

            <p className="mt-2 text-text-secondary">
              Organize your folders, documents, and knowledge in one place.
            </p>
          </header>

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
              <div className="mb-4 text-3xl">📚</div>
              <h2 className="text-lg font-semibold text-text-primary">
                Libraries
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Your personal collections and knowledge spaces.
              </p>
            </div>

            <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
              <div className="mb-4 text-3xl">📁</div>
              <h2 className="text-lg font-semibold text-text-primary">
                Folders
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Keep related documents organized together.
              </p>
            </div>

            <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm">
              <div className="mb-4 text-3xl">📄</div>
              <h2 className="text-lg font-semibold text-text-primary">
                Documents
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Create documents with multiple pages and details.
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-dashed border-border-default bg-white p-10 text-center">
            <div className="text-4xl">✨</div>

            <h2 className="mt-4 text-xl font-semibold text-text-primary">
              Your library is ready
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
              Start by creating your first library, then add folders,
              documents, and pages.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

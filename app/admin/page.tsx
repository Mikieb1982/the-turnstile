// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* soft spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[30rem] w-[60rem]
                        -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <header className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Welcome to the control room. Manage users, content and settings from one place.
          </p>
        </header>

        {/* quick-start cards */}
        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Users', desc: 'Invite, edit roles and export data.' },
            { title: 'Content', desc: 'Moderate posts, comments and media.' },
            { title: 'Analytics', desc: 'View traffic, KPIs and reports.' },
          ].map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl bg-white/60 p-6 shadow-md ring-1
                         ring-slate-900/5 backdrop-blur transition
                         hover:shadow-lg hover:-translate-y-0.5 dark:bg-slate-800/60 dark:ring-white/10"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {c.desc}
              </p>
            </div>
          ))}
        </section>

        {/* empty-state hint */}
        <div className="mt-16 rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Select a category from the navigation above to begin.
          </p>
        </div>
      </div>
    </main>
  );
}

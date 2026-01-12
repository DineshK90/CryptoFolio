export default function AuthForm({
  title,
  submitLabel,
  onSubmit,
  footerText,
  footerLinkText,
  footerLinkHref,
  showNameField = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900 border border-slate-800 rounded-lg p-8 w-full max-w-md"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">{title}</h1>

      <div className="space-y-4">
        {showNameField && (
          <div>
            <label className="block text-sm mb-1 text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Alex Tan"
              className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1 text-slate-400">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 py-2 rounded-md font-medium transition"
      >
        {submitLabel}
      </button>

      <p className="text-sm text-slate-400 text-center mt-6">
        {footerText}{" "}
        <a
          href={footerLinkHref}
          className="text-indigo-400 hover:text-indigo-300"
        >
          {footerLinkText}
        </a>
      </p>
    </form>
  );
}

import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="text-slate-400 text-sm">
          Manage your account information
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-medium">
            {user?.displayName?.charAt(0) || "U"}
          </div>

          <div>
            <p className="text-sm font-medium">
              {user?.displayName}
            </p>
            <p className="text-xs text-slate-400">
              Account profile
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Name
          </p>
          <p>{user?.displayName}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Email
          </p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

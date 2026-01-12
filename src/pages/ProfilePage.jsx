import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Profile
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md">
        <p className="text-slate-400 text-sm mb-1">Name</p>
        <p className="mb-4">{user?.displayName}</p>

        <p className="text-slate-400 text-sm mb-1">Email</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

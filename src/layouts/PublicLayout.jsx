import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <Outlet />
    </div>
  );
}

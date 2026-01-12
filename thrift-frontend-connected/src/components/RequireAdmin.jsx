import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../app/store";

export default function RequireAdmin() {
  const { state } = useStore();
  const loc = useLocation();
  const allowed = state.auth.isLoggedIn && state.auth.role === "admin";
  if (!allowed) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}

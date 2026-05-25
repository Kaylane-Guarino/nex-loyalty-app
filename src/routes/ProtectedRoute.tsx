import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { UserRole } from "../@types/auth";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: UserRole;
}

export function ProtectedRoute({
  children,
  allowedRole,
}: ProtectedRouteProps) {
  const { getUser, isAuthenticated } = useAuth();

  const user = getUser();

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
}
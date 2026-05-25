import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AdminDashboard } from "../pages/AdminDashboard";
import { UserStatement } from "../pages/UserStatement";
import { Wallet } from "../pages/Wallet";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STATEMENT}
          element={
            <ProtectedRoute allowedRole="user">
              <UserStatement />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.WALLET}
          element={
            <ProtectedRoute allowedRole="user">
              <Wallet />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
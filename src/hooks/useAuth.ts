import { useState } from "react";

import type { User } from "../@types/auth";

import { ROUTES } from "../constants/routes";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { authService } from "../services/authService";
import { appToast } from "../utils/toast";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  function getUser(): User | null {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (!storedUser) return null;

    return JSON.parse(storedUser) as User;
  }

  function isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(STORAGE_KEYS.TOKEN));
  }

  async function login(email: string, password: string) {
    setIsLoading(true);

    try {
      const data = await authService.login({ email, password });

      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

      appToast.success("Login realizado com sucesso!");

      setTimeout(() => {
        window.location.href =
          data.user.role === "admin" ? ROUTES.ADMIN : ROUTES.STATEMENT;
      }, 500);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(
    name: string,
    email: string,
    cpf: string,
    password: string
  ) {
    setIsLoading(true);

    try {
      await authService.register({
        name,
        email,
        cpf,
        password,
      });

      appToast.success(
        "Account created successfully!"
      );

      window.location.href =
        ROUTES.LOGIN;

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Error creating account.";

      appToast.error(message);

    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    appToast.info("Você saiu da aplicação.");

    setTimeout(() => {
      window.location.href = ROUTES.LOGIN;
    }, 400);
  }

  return {
    isLoading,
    getUser,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
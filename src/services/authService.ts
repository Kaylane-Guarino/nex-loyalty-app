import { api } from "./api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../@types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", payload);

    return response.data;
  },

  async register(payload: RegisterPayload): Promise<void> {
    await api.post("/auth/register", payload);
  },
};
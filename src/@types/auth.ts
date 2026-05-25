export type UserRole = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
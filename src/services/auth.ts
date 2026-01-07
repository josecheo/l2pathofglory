import { api } from "./api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export const authService = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
  async login(payload: LoginPayload) {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  async logout() {
    await api.post("/auth/logout");
  },
  async me() {
    const { data } = await api.get("/auth/me");
    return data;
  }
};

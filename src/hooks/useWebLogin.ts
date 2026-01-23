import { useCallback, useState } from "react";
import { webLogin } from "../services/webLoginApi";
import { tokenStorage } from "../auth/tokenStorage";

export function useWebLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { token } = await webLogin(email.trim().toLowerCase(), password);
      tokenStorage.set(token);
      return { ok: true as const, token };
    } catch (e: any) {
      const msg = e?.message || "Error";
      setError(msg === "Invalid credentials" ? "Credenciales inválidas" : msg);
      return { ok: false as const };
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, setError };
}

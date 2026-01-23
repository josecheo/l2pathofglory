import { useCallback, useEffect, useMemo, useState } from "react";
import { getMe, MeResponse } from "../services/meApi";
import { tokenStorage } from "../auth/tokenStorage";

export function useAccount() {
  const token = tokenStorage.get();

  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!token) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const me = await getMe(token);
      setData(me);
    } catch (e: any) {
      setError(e?.message || "Error cargando cuenta");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const stats = useMemo(() => {
    const chars = data?.characters ?? [];
    const total = chars.length;
    const online = chars.filter((c) => c.online === 1).length;
    const maxLevel = chars.reduce((m, c) => Math.max(m, c.level), 0);
    return { total, online, maxLevel };
  }, [data]);

  return { token, data, loading, error, refresh, stats };
}

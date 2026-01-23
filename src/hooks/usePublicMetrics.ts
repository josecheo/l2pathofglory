import { useCallback, useEffect, useRef, useState } from "react";
import { getPublicMetrics, PublicMetrics } from "../services/metrics";

type UsePublicMetricsOptions = {
  refetchIntervalMs?: number; // ej: 10000 para 10s
  enabled?: boolean;          // por si quieres desactivar en algún caso
};

type UsePublicMetricsResult = {
  data: PublicMetrics | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function usePublicMetrics(options: UsePublicMetricsOptions = {}): UsePublicMetricsResult {
  const { refetchIntervalMs, enabled = true } = options;

  const [data, setData] = useState<PublicMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;

    // Cancelar request anterior si existe
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);

    try {
      const result = await getPublicMetrics(controller.signal);
      setData(result);
    } catch (e: any) {
      // Abort es normal cuando refrescas rápido o desmontas
      if (e?.name === "AbortError") return;
      setError("No se pudo cargar la información del servidor");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    refresh();

    if (!refetchIntervalMs) return;

    const id = window.setInterval(() => {
      refresh();
    }, refetchIntervalMs);

    return () => window.clearInterval(id);
  }, [enabled, refetchIntervalMs, refresh]);

  useEffect(() => {
    // Cleanup: abort al desmontar
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return { data, loading, error, refresh };
}

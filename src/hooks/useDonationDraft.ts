import { useCallback, useState } from "react";
import { createDonationDraft, DonationDraftResponse } from "../services/donationsApi";
import { tokenStorage } from "../auth/tokenStorage";

type UseDonationDraftResult = {
  draft: DonationDraftResponse | null;
  loading: boolean;
  error: string | null;
  createDraft: (args: { charName: string; amountUsd: number }) => Promise<DonationDraftResponse | null>;
  resetDraft: () => void;
};

export function useDonationDraft(): UseDonationDraftResult {
  const [draft, setDraft] = useState<DonationDraftResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetDraft = useCallback(() => {
    setDraft(null);
    setError(null);
    setLoading(false);
  }, []);

  const createDraft = useCallback(async ({ charName, amountUsd }: { charName: string; amountUsd: number }) => {
    const token = tokenStorage.get();
    if (!token) {
      setError("No hay sesión activa. Inicia sesión nuevamente.");
      return null;
    }

    const cleanCharName = charName.trim();
    const cleanAmount = Number(amountUsd);

    if (!cleanCharName) {
      setError("Selecciona un personaje.");
      return null;
    }
    if (!Number.isFinite(cleanAmount) || cleanAmount <= 0) {
      setError("Ingresa un monto válido.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await createDonationDraft(token, {
        charName: cleanCharName,
        amountUsd: cleanAmount,
      });

      setDraft(res);
      return res;
    } catch (e: any) {
      const status = e?.status;

      // Mensajes más friendly según tu backend
      if (status === 401) setError("Sesión expirada. Vuelve a iniciar sesión.");
      else if (status === 403) setError("Ese personaje no pertenece a tu cuenta.");
      else if (status === 400) setError(e?.message || "Revisa el monto e intenta nuevamente.");
      else setError(e?.message || "No se pudo crear la orden de donación.");

      setDraft(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { draft, loading, error, createDraft, resetDraft };
}

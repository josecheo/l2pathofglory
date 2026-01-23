const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type DonationDraftResponse = {
  draftId: string;
  amountUsd: number;
  currency: "USD";
};

export type CreateDraftPayload = {
  charName: string;
  amountUsd: number;
};

export async function createDonationDraft(
  token: string,
  payload: CreateDraftPayload
): Promise<DonationDraftResponse> {
  const res = await fetch(`${API_URL}/donations/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {}

    const message = body?.message || "Failed to create draft";
    const error: any = new Error(message);
    error.status = res.status;
    error.body = body;
    throw error;
  }

  return res.json();
}

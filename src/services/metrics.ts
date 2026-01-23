const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type PublicMetrics = {
  onlinePlayers: number;
  totalAccounts: number;
  totalCharacters: number;
  updatedAt: string;
};

export async function getPublicMetrics(): Promise<PublicMetrics> {
  const res = await fetch(`${API_URL}/public/metrics`);
  if (!res.ok) throw new Error("Failed to load metrics");
  return res.json();
}

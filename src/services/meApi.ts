const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type Character = {
  name: string;
  level: number;
  classId: number;
  online: number; // 1/0
};

export type MeResponse = {
  account: { login: string };
  characters: Character[];
};

export async function getMe(token: string): Promise<MeResponse> {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    let body: any = null;
    try { body = await res.json(); } catch {}
    const msg = body?.message || "Unauthorized";
    throw new Error(msg);
  }

  return res.json();
}

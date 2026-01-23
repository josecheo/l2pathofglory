const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type WebLoginResponse = { token: string };

export async function webLogin(identifier: string, password: string) {
  const res = await fetch(`${API_URL}/web/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || "Login failed");
  }

  return res.json();
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type WebRegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export type WebRegisterResult = { ok: true };

export type ApiError = {
  status: number;
  message: string;
  issues?: Array<{ path?: (string | number)[]; message?: string }>;
};

async function parseError(res: Response): Promise<ApiError> {
  let body: any = null;
  try {
    body = await res.json();
  } catch {}

  return {
    status: res.status,
    message: body?.message || res.statusText || "Request failed",
    issues: body?.issues,
  };
}

export async function webRegister(payload: WebRegisterPayload): Promise<WebRegisterResult> {
  const res = await fetch(`${API_URL}/web/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw await parseError(res);
  return res.json();
}

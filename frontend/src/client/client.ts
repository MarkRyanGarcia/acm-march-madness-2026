export const API_BACKEND_URL = 'http://localhost:8000';

type ApiResult<T> = { ok: boolean; status: number; data: T };

export async function apiFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const res = await fetch(input, { ...init, credentials: "include" });

  const text = await res.text();
  const ct = res.headers.get("Content-Type") ?? "";

  let parsed: unknown = text;
  if (ct.includes("application/json")) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  return {
    ok: true,
    status: res.status,
    data: parsed as T,
  };
}

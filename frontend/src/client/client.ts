export const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

type ApiResult<T> = { ok: boolean; status: number; data: T };

export async function apiFetch<T>(
  input: RequestInfo | URL,
  options?: RequestInit
): Promise<ApiResult<T>> {
  const res = await fetch(input, options);

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
    ok: res.ok,
    status: res.status,
    data: parsed as T,
  };
}
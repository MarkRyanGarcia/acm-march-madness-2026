export const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

export async function apiFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, { ...init, credentials: "include" });

  const text = await res.text();
  const ct = res.headers.get("Content-Type") ?? "";

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  if (ct.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return text as T;
    }
  }

  return text as T;
}

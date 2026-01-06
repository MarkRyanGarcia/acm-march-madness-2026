import { useAuth } from "@clerk/clerk-react";

export const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetchWithToken<T>(
  input: RequestInfo | URL,
  token: string,
  init?: ApiFetchOptions,
): Promise<T> {
  const { auth = true, ...requestInit } = init ?? {};

  const headers: Record<string, string> = {
    ...(requestInit.headers instanceof Headers
      ? Object.fromEntries(requestInit.headers.entries())
      : Array.isArray(requestInit.headers)
        ? Object.fromEntries(requestInit.headers)
        : (requestInit.headers ?? {})),
  };

  if (auth) {
    if (import.meta.env.VITE_ENV === "production") {
      headers.Authorization = `Bearer ${token}`;
    } else {
      headers.Authorization = `Dev ${import.meta.env.VITE_DEV_USER_ID || "user_dev_default"}`;
    }
  }

  if (init?.body && typeof init.body === "string" && !headers["Content-Type"])
    headers["Content-Type"] = "application/json";

  const res = await fetch(input, {
    ...init,
    headers,
  });

  const bodyText = await res.text();
  const contentType = res.headers.get("Content-Type") ?? "";

  let parsedBody: unknown = bodyText;
  if (bodyText && contentType.includes("application/json")) {
    try {
      parsedBody = JSON.parse(bodyText);
    } catch {
      // fall back to raw text
    }
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} - ${bodyText}`);
  }

  return parsedBody as T;
}

export function useApiClient() {
  const { getToken } = useAuth();

  async function apiFetch<T>(
    input: RequestInfo | URL,
    init?: ApiFetchOptions,
  ): Promise<T> {
    if (init?.auth === false) {
      return apiFetchWithToken<T>(input, "", init);
    }

    const token = await getToken();
    if (!token) {
      throw new Error("No auth token found");
    }
    return apiFetchWithToken<T>(input, token, init);
  }

  return { apiFetch };
}

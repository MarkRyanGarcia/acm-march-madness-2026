import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { API_BACKEND_URL } from "@/client/client";

export function useInput(day: string) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = await getToken();

      const res = await fetch(`${API_BACKEND_URL}/problems/${day}/input`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch input");
      }

      const text = await res.text();

      // Open in new tab
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      return text;
    },
  });
}

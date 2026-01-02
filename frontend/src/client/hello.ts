import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "./apiClient";

type HelloInput = {
  message: string;
};

type HelloResponse = {
  message: string;
};

export function useHello() {
  const { apiFetch } = useApiClient();

  return useMutation({
    mutationKey: ["hello"],
    mutationFn: (input: HelloInput) =>
      apiFetch<HelloResponse>("http://localhost:8000/hello", {
        auth: true,
        method: "POST",
        body: JSON.stringify(input),
      }),
  });
}

import { useQuery } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useProblem(day: string) {
  const { apiFetch } = useApiClient();

  const fetchProblem = async (): Promise<string> => {
    const problemResponse: string = await apiFetch(
      `${API_BACKEND_URL}/problems/${day}`, { auth: false }
    );
    return problemResponse
  };

  return useQuery({
    queryKey: ["problem", day],
    queryFn: fetchProblem,
  });
}

import { getTasks } from "../services/apiTasks";
import { useQuery } from "@tanstack/react-query";

export function useTasks(accessToken) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(accessToken),
  });

  return {
    tasks: data,
    isLoading,
    error,
  };
}

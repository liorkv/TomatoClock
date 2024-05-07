import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useTasks() {
  const axiosPrivate = useAxiosPrivate();

  const getTasks = async () => {
    const response = await axiosPrivate.get("/task");
    return response.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return {
    tasks: data,
    isLoading,
    error,
  };
}

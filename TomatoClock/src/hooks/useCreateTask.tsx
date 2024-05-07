import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const axiosPrivate = useAxiosPrivate();

  const createTaskApi = async (description: string) => {
    const response = await axiosPrivate.post("/task", {
      description,
    });
    return response.data;
  };

  const { mutate: createTask, status } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      console.log("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => console.log(err),
  });

  const isCreating = status === "pending";

  return { isCreating, createTask };
}

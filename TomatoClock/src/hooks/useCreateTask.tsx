import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "../services/apiTasks";

export function useCreateTask() {
  const queryClient = useQueryClient();

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

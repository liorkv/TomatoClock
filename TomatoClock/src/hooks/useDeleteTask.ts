import { useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        await axios.delete(`/task/${taskId}`);

        queryClient.invalidateQueries({ queryKey: ["tasks"] });

        toast.success("Task deleted successfully", {
          style: {
            fontSize: "16px",
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [queryClient]
  );

  return deleteTask;
};

export default useDeleteTask;
